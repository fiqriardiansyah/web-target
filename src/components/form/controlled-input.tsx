import { Form, Input, InputProps, FormItemProps } from "antd";
import { Control, Controller, FieldValues, Path, ControllerProps } from "react-hook-form";
import { formatNumberWithDots } from "../../utils";

type ControlledInputProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledInput = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledInputProps<T>) => {
    const typeInput = inputProps?.type || 'text'

    return (
        <Form.Item label={label} {...formItemProps}>
            <Controller
                {...controllerProps}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        {typeInput === "password" && <Input.Password {...field} {...inputProps} name={name} status={error ? "error" : undefined} />}
                        {typeInput === "text" && <Input {...field} {...inputProps} name={name} status={error ? "error" : undefined} />}
                        {typeInput === "number" && (
                            <Input
                                {...field}
                                {...inputProps}
                                type="text"
                                onKeyDown={(e) => {
                                    if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
                                        e.preventDefault();
                                    }
                                }}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    field.onChange(formatNumberWithDots(parseInt(value === '' ? '0' : value)));
                                }}
                                name={name}
                                status={error ? "error" : undefined} />
                        )}
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </>
                )}
            />
        </Form.Item>
    );
};