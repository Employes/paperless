# Stepper

## Usage:

```html
<p-stepper>
    <p-stepper-item>Step 1</p-stepper-item>
    <p-stepper-item>Step 1</p-stepper-item>
    <p-stepper-item>Step 1</p-stepper-item>
</p-stepper>
```

<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                  | Type                         | Default        |
| ------------ | ------------- | ---------------------------- | ---------------------------- | -------------- |
| `activeStep` | `active-step` | The currently active step    | `number`                     | `1`            |
| `direction`  | `direction`   | The direction of the stepper | `"horizontal" \| "vertical"` | `'horizontal'` |


## Dependencies

### Depends on

- [p-stepper-line](../../atoms/stepper-line)
- [p-stepper-item](../../atoms/stepper-item)

### Graph
```mermaid
graph TD;
  p-stepper --> p-stepper-line
  p-stepper --> p-stepper-item
  p-stepper-item --> p-icon
  style p-stepper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
