# Table Definition

## Usage:

```html
<p-table-definition />
```

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute | Description                                           | Type                                             | Default                |
| ---------- | --------- | ----------------------------------------------------- | ------------------------------------------------ | ---------------------- |
| `align`    | `align`   | The alignment of the column                           | `"center" \| "end" \| "start"`                   | `'start'`              |
| `name`     | `name`    | The name of the column                                | `string`                                         | `undefined`            |
| `path`     | `path`    | The path of the value of the item you want to display | `string`                                         | `undefined`            |
| `sizes`    | `sizes`   | The sizes of the column                               | `"auto" \| TableDefinitionSizes \| number`       | `'auto'`               |
| `template` | --        | The template for the data view                        | `(data: TableDefinitionTemplateFuncData) => any` | `({ value }) => value` |
| `type`     | `type`    | The type of the column                                | `"td" \| "th"`                                   | `'td'`                 |


## Events

| Event                    | Description                                     | Type                   |
| ------------------------ | ----------------------------------------------- | ---------------------- |
| `tableDefinitionChanged` | Event to let the table know it has to re render | `CustomEvent<boolean>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
