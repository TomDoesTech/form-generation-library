import React from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import NumberField from './components/NumberField';
import TextField from './components/TextField';
import {
  ArrayFieldProps,
  Field,
  FormProps,
  ObjectFieldProps,
  Tags,
} from './types';

const appendDefaults = {
  text: '',
  number: 0,
  array: [],
  object: {},
};

const ComponentTags: Tags = {
  text: TextField,
  number: NumberField,
  object: ObjectField,
  array: ArrayField,
};

function ObjectField(props: ObjectFieldProps & { name: string }) {
  const { label, name, properties } = props;

  return (
    <div>
      <label>{label}</label>
      {Object.entries(properties).map(([fieldName, objectField]) => {
        return renderFields([`${name}.${fieldName}`, objectField]);
      })}
    </div>
  );
}

function ArrayField(props: ArrayFieldProps & { name: string }) {
  const { name, itemField, label } = props;

  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  function add() {
    append(appendDefaults[itemField.type]);
  }

  return (
    <div>
      <label>{label}</label>
      <button onClick={add} type="button">
        +
      </button>

      {fields.map((item, i) => {
        return (
          <div key={`ArrayField__${name}_${item.id}`}>
            {renderFields([`${name}[${i}]`, itemField])}
            <button type="button" onClick={() => remove(i)}>
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

function renderFields([name, { type, ...fieldProps }]: [string, Field]) {
  const ComponentTag = ComponentTags[type];
  return <ComponentTag {...fieldProps} name={name} />;
}

export function Form({ fields, onSubmit }: FormProps) {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {Object.entries(fields).map(renderFields)}
        <button type="submit">Save</button>
      </form>
    </FormProvider>
  );
}
