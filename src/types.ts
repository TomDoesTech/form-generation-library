import { HTMLInputTypeAttribute } from 'react';
import { SubmitHandler, FieldValues } from 'react-hook-form';

type DefaultProps = {
  label: string;
  placeholder?: string;
};

export type TextFieldProps = DefaultProps & {
  type: 'text';
  htmlType?: HTMLInputTypeAttribute;
};

export type NumberFieldProps = DefaultProps & {
  type: 'number';
  min?: number;
  max?: number;
};

export type ObjectFieldProps = DefaultProps & {
  type: 'object';
  properties: Fields;
};

export type ArrayFieldProps = DefaultProps & {
  type: 'array';
  itemField: Field;
};

export type Field =
  | TextFieldProps
  | NumberFieldProps
  | ObjectFieldProps
  | ArrayFieldProps;

type Fields = Record<string, Field>;

export interface FormProps {
  fields: Fields;
  onSubmit: SubmitHandler<FieldValues>;
}

export type Tags = {
  [key in Field['type']]: (props: any) => JSX.Element;
};
