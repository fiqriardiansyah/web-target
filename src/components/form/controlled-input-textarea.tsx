
import { Form, FormItemProps, Input } from "antd";
import { TextAreaProps } from "antd/es/input";
import { Control, Controller, ControllerProps, FieldValues, Path } from "react-hook-form";

type ControlledInputTextAreaProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    rules?: object;
    inputProps?: TextAreaProps;
    formItemProps?: FormItemProps;
    controllerProps?: ControllerProps;
};

export const ControlledInputTextArea = <T extends FieldValues>({
    name,
    control,
    label,
    rules,
    inputProps,
    formItemProps,
    controllerProps,
}: ControlledInputTextAreaProps<T>) => {
    return (
        <Form.Item label={label} {...formItemProps}>
            <Controller
                {...controllerProps}
                name={name}
                control={control}
                rules={rules}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <Input.TextArea {...field} {...inputProps} name={name} status={error ? "error" : undefined} />
                        {error && <span className="text-red-400 italic text-[10px]">{error.message}</span>}
                    </>
                )}
            />
        </Form.Item>
    );
};