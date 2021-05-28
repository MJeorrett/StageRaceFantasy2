import { useField } from 'formik';

export const useFieldState = <Value, >(fieldName: string): [Value, (value: Value, shouldValidate?: boolean) => void] => {
    const [{ value }, , { setValue }] = useField<Value>(fieldName);

    return [
        value,
        setValue,
    ];
};