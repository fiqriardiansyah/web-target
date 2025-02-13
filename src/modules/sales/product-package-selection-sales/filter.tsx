import { Button, Input } from "antd";
import React from "react";
import { useDebounce, useProductPackageContext } from "../../../hooks";

export default function Filter() {
    const productPackageContext = useProductPackageContext();
    const [search, setSearch] = React.useState('');
    const prevSearch = React.useRef<string | undefined>(undefined);

    const handleSearch = (query?: string) => {
        if (query === prevSearch.current) return;
        productPackageContext.setState((prev) => ({ ...prev, query }));
        prevSearch.current = query;
    };

    useDebounce(search, 500, handleSearch);

    const storeEnableHandler = () => {
        productPackageContext.setState((prev) => ({ ...prev, store: !prev?.store }));
    }

    const onChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    return (
        <div className="w-full gap-4 flex items-center">
            <Input.Search value={search} onChange={onChangeQuery} size="large" placeholder="Cari nama atau no hp customer" />
            <Button onClick={storeEnableHandler} style={{ filter: productPackageContext.state?.store ? '' : 'grayscale(1)' }} size="large" type="primary">
                Item in store
            </Button>
        </div>
    )
}