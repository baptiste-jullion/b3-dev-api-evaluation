import type { Response } from "express";
import { Op } from "sequelize";
import { Product, Tag } from "#db/models";
import {
	APIError,
	type TypedRequest,
	extractPaginationInfosFromRequest,
} from "#utils";

const listProducts = async (req: TypedRequest, res: Response) => {
	try {
		const { limit, page } = extractPaginationInfosFromRequest(req);

		const { tags } = req.query;

		// Type of tags can be :
		// - title (string) (e.g. ?tags=tag1)
		// - title (string) (e.g. ?tags=tag1,tag2)
		// - array of title (string) (e.g. ?tags[]=tag1&tags[]=tag2)
		// - id (number) (e.g. ?tags=1)
		// - id (number) (e.g. ?tags=1,2)
		// - array of id (number) (e.g. ?tags[]=1&tags[]=2)
		// - mixed (e.g. ?tags=tag1,1,tag2,2)
		// - mixed (e.g. ?tags[]=tag1&tags[]=1&tags[]=tag2&tags[]=2)

		let where = undefined;

		if (tags) {
			let tagsArray: string[] = [];

			if (typeof tags === "string") {
				tagsArray = tags.split(",");
			} else if (Array.isArray(tags)) {
				tagsArray = tags as string[];
			}

			where = {
				[Op.or]: [
					{ title: { [Op.in]: tagsArray } },
					{ id: { [Op.in]: tagsArray.map(Number).filter(Boolean) } },
				],
			};
		}

		const { count: total, rows: products } = await Product.findAndCountAll({
			include: {
				model: Tag,
				as: "Tags",
				where,
			},
			limit,
			where: {
				count: {
					[Op.gt]: 0,
				},
			},
			offset: (page - 1) * limit,
			attributes: {
				exclude: ["description"],
			},
		});

		if (!products.length) throw new APIError(404);

		res.json({
			total,
			next:
				total > page * limit
					? {
							page: page + 1,
							limit,
						}
					: null,
			previous:
				page > 1
					? {
							page: page - 1,
							limit,
						}
					: null,
			results: products,
		});
	} catch (error) {
		APIError.handleError(res, error);
	}
};

export { listProducts };
