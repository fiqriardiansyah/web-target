import { useProductPackageContext } from "../../../hooks"
import PackageList from "./package-list";
import UnitList from "./unit-list";

export default function Selections() {
    const productPackageContext = useProductPackageContext();

    if (productPackageContext.state.type === "unit") {
        return <UnitList />
    }

    return <PackageList />
}