import {
  articlesForCategory,
  cataloguePagesForCategory,
  modelsForCategory,
} from "@/lib/products/all";
import type { ProductCategory } from "@/lib/products/types";

/**
 * Category metadata.
 *
 * Names and descriptions are taken from the catalogue's own section
 * introductions — prose blocks, not table rows, so they extract reliably.
 * Neither count is written here. `modelCount` (product pages) and
 * `articleCount` (article numbers across them) are both counted from the
 * product data below, so adding a range cannot leave a stale total behind in
 * the category cards, the navigation or a category header.
 */
type CategoryMeta = Omit<
  ProductCategory,
  "modelCount" | "articleCount" | "cataloguePages"
>;

const categoryMeta: CategoryMeta[] = [
  {
    slug: "boning-knives",
    name: "Boning Knives",
    tagline: "Narrow, flexible blades for working around bone.",
    description:
      "Boning knives are specialised knives designed for removing bones from meat, poultry or fish. They have a narrow, flexible blade that makes it easy to work around the bones and separate the meat without wasting any. The blade is often pointed and can be either curved or straight, depending on the user's preference.",
    seo: {
      title: "Boning Knives",
      description:
        "Morakniv boning knives for the professional food industry — curved and straight blades in narrow and wide profiles, made in Mora, Sweden.",
    },
  },
  {
    slug: "butcher-knives",
    name: "Butcher Knives",
    tagline: "Heavy-duty blades for breaking down large cuts.",
    description:
      "Butcher knives are heavy-duty knives designed for cutting through large pieces of meat and breaking down animal carcasses. They feature a wide, sturdy blade with a curved edge, making them suited to chopping, slicing and disjointing meat with precision. Their robust design allows for efficient handling of tough meats and bones.",
    seo: {
      title: "Butcher Knives",
      description:
        "Morakniv butcher knives for meat processing — wide, sturdy blades for breaking down large cuts, made in Mora, Sweden.",
    },
  },
  {
    slug: "filleting-knives",
    name: "Filleting Knives",
    tagline: "Long, thin blades for fish and delicate proteins.",
    description:
      "Filleting knives are designed for preparing fish and delicate meats. They feature a long, thin and flexible blade that allows for precise cuts and easy separation of the flesh from the bones and skin. The flexibility of the blade makes it ideal for filleting fish, as it can move smoothly around bones without damaging the meat.",
    seo: {
      title: "Filleting Knives",
      description:
        "Morakniv filleting knives for fish and delicate proteins — long, thin, flexible blades made in Mora, Sweden.",
    },
  },
  {
    slug: "trimming-knives",
    name: "Trimming Knives",
    tagline: "Short, controlled blades for fat, skin and sinew.",
    description:
      "Trimming knives are small, versatile knives designed for removing excess fat, skin or connective tissue from meat. They feature a short, curved blade that provides precision and control, making it easier to trim and refine cuts of meat. Their compact size and sharp edge suit detailed trimming tasks, ensuring clean, neat cuts.",
    seo: {
      title: "Trimming Knives",
      description:
        "Morakniv trimming knives for removing fat, skin and connective tissue — short, controlled blades made in Mora, Sweden.",
    },
  },
  {
    slug: "chefs-knives",
    name: "Chef's Knives",
    tagline: "All-purpose blades for chopping, slicing and dicing.",
    description:
      "Chef's knives are versatile, all-purpose knives designed for a wide range of tasks including chopping, slicing, dicing and mincing. They are known for their balance and durability, making them a staple in professional kitchens. The curved blade allows for a rocking motion, which makes cutting more efficient.",
    seo: {
      title: "Chef's Knives",
      description:
        "Morakniv chef's knives for professional kitchens — versatile blades for chopping, slicing and dicing, made in Mora, Sweden.",
    },
  },
  {
    slug: "special-knives",
    name: "Special Knives",
    tagline: "Task-specific tools for skinning, gutting and bleeding.",
    description:
      "Special knives are designed to meet the unique demands of specific tasks in food and meat processing. Whether it is skinning, gutting, bleeding or preparing specialised cuts, these knives offer precision, durability and ergonomic designs tailored for professional use, across a variety of blade shapes and lengths.",
    seo: {
      title: "Special Knives",
      description:
        "Morakniv special knives for skinning, gutting, bleeding and specialised meat processing tasks, made in Mora, Sweden.",
    },
  },
];

/** Metadata plus the live model and article counts for each category. */
export const categories: ProductCategory[] = categoryMeta.map((category) => ({
  ...category,
  modelCount: modelsForCategory(category.slug),
  articleCount: articlesForCategory(category.slug),
  cataloguePages: cataloguePagesForCategory(category.slug),
}));

export const categoryBySlug = new Map(
  categories.map((category) => [category.slug, category]),
);
