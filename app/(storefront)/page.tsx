import { CategoriesSelection } from "@/components/storefront/CategorySelection";
import { FeaturedProducts } from "@/components/storefront/FeaturedProducts";
import { Hero } from "@/components/storefront/Hero";
import { JoggersProducts } from "@/components/storefront/JoggersProduct";
import { TshirtProducts } from "@/components/storefront/Tshirt";


export default function IndexPage() {
    return (
        <div>
           <Hero />
           <CategoriesSelection />
           <FeaturedProducts />
           <TshirtProducts />
           <JoggersProducts />
        </div>
    )
}