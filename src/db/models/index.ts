import { Cart } from "./Cart";
import { CartItem } from "./CartItem";
import { Command } from "./Command";
import { Product } from "./Product";
import { Tag } from "./Tag";
import { User } from "./User";

Product.belongsToMany(Tag, { through: "ProductTag" });
Tag.belongsToMany(Product, { through: "ProductTag" });

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(CartItem);
CartItem.belongsTo(Product);

Cart.hasMany(CartItem);
CartItem.belongsTo(Cart);

export { User, Product, Tag, Cart, CartItem, Command };
