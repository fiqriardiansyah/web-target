import { Button } from "antd";
import { useProductPackageContext } from "../../../hooks";

export default function FilterType() {
    const productPackageContext = useProductPackageContext();

    const typeClickHandler = (type: "unit" | "package") => {
        return () => {
            productPackageContext.setState((prev) => ({ ...prev, type }));
        }
    }

    return (
        <div className="flex items-center w-full">
            <Button onClick={typeClickHandler("unit")} type="primary" size="large"
                className={`!flex-1 !rounded-tr-none !rounded-br-none ${productPackageContext.state?.type === "unit" ? '' : '!bg-primary/50'}`}>
                Produk
            </Button>
            <Button onClick={typeClickHandler("package")} type="primary" size="large" className={`!flex-1 !rounded-tl-none !rounded-bl-none ${productPackageContext.state?.type === "package" ? '' : '!bg-primary/50'}`}>
                Paket
            </Button>
        </div>
    )
}