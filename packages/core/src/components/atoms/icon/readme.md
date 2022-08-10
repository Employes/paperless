# Icon

## Usage:

```html
<p-icon variant="name" />
```

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description                                        | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Default     |
| ---------------------- | --------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `flip`                 | `flip`    | Wether to flip the icon horizontally or vertically | `"horizontal" \| "vertical"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `null`      |
| `rotate`               | `rotate`  | Wether to rotate the icon x degrees                | `-135 \| -180 \| -225 \| -25 \| -270 \| -315 \| -45 \| -90 \| 0 \| 135 \| 180 \| 225 \| 25 \| 270 \| 315 \| 45 \| 90`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `0`         |
| `size`                 | `size`    | The size of the icon, using tailwind sizes         | `"2xl" \| "3xl" \| "4xl" \| "5xl" \| "6xl" \| "auto" \| "base" \| "lg" \| "sm" \| "xl" \| "xs" \| "xxs"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `'auto'`    |
| `variant` _(required)_ | `variant` | The icon the be displayed                          | `"arrow" \| "attachment" \| "bread" \| "calendar" \| "car" \| "checklist" \| "checkmark" \| "chevron" \| "clock" \| "cogs" \| "comment" \| "document" \| "download" \| "envelope" \| "explanation" \| "eye" \| "filter" \| "folder" \| "grid" \| "headset" \| "integration" \| "list" \| "location" \| "megaphone" \| "minus" \| "negative" \| "pagination" \| "payment" \| "pencil" \| "person" \| "plus" \| "question" \| "receipt" \| "report" \| "search" \| "settings" \| "sick" \| "tachometer" \| "task" \| "template" \| "tool" \| "trash" \| "turn" \| "upload" \| "warning"` | `undefined` |


## Dependencies

### Used by

 - [p-accordion](../../molecules/accordion)
 - [p-button](../button)
 - [p-card-header](../card-header)
 - [p-info-panel](../info-panel)
 - [p-navigation-item](../../molecules/navigation-item)
 - [p-pagination](../../molecules/pagination)
 - [p-segment-item](../segment-item)
 - [p-status](../status)
 - [p-stepper-step](../stepper-step)

### Graph
```mermaid
graph TD;
  p-accordion --> p-icon
  p-button --> p-icon
  p-card-header --> p-icon
  p-info-panel --> p-icon
  p-navigation-item --> p-icon
  p-pagination --> p-icon
  p-segment-item --> p-icon
  p-status --> p-icon
  p-stepper-step --> p-icon
  style p-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
