# Select

## Usage:

```html
<p-select>
    <!-- content -->
</p-select>
```

<!-- Auto Generated Below -->


## Properties

| Property                  | Attribute                  | Description                                       | Type              | Default     |
| ------------------------- | -------------------------- | ------------------------------------------------- | ----------------- | ----------- |
| `autoSelectFirst`         | `auto-select-first`        | Wether to automatically select the first item     | `boolean`         | `true`      |
| `autocompletePlaceholder` | `autocomplete-placeholder` | The placeholder of the input when auto completing | `string`          | `undefined` |
| `displayKey`              | `display-key`              | The key of the object to display                  | `string`          | `'text'`    |
| `enableAutocomplete`      | `enable-autocomplete`      | Wether to enable autocomplete                     | `boolean`         | `true`      |
| `items`                   | `items`                    | The items to show in the dropdown                 | `any[] \| string` | `undefined` |
| `placeholder`             | `placeholder`              | The placeholder of the input                      | `string`          | `undefined` |
| `query`                   | `query`                    | The current query                                 | `string`          | `undefined` |
| `queryKey`                | `query-key`                | The key of the object to display                  | `string`          | `undefined` |
| `value`                   | `value`                    | The current value                                 | `any`             | `undefined` |
| `valueKey`                | `value-key`                | The key of the object to return                   | `string`          | `'value'`   |


## Events

| Event         | Description                                      | Type                  |
| ------------- | ------------------------------------------------ | --------------------- |
| `queryChange` | Event when the query of the autocomplete changes | `CustomEvent<string>` |
| `valueChange` | Event when the value changes                     | `CustomEvent<any>`    |


## Dependencies

### Depends on

- [p-dropdown](../dropdown)
- [p-input-group](../input-group)
- [p-dropdown-menu-item](../../atoms/dropdown-menu-item)

### Graph
```mermaid
graph TD;
  p-select --> p-dropdown
  p-select --> p-input-group
  p-select --> p-dropdown-menu-item
  p-dropdown --> p-dropdown-menu-container
  p-input-group --> p-helper
  p-input-group --> p-icon
  p-input-group --> p-tooltip
  p-helper --> p-tooltip
  p-dropdown-menu-item --> p-icon
  style p-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
