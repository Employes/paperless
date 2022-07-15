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
| `rotate`               | `rotate`  | Wether to rotate the icon x degrees                | `number`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `null`      |
| `size`                 | `size`    | The size of the icon, using tailwind sizes         | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `'auto'`    |
| `variant` _(required)_ | `variant` | The icon the be displayed                          | `"arrow" \| "attachment" \| "bread" \| "calendar" \| "car" \| "checklist" \| "checkmark" \| "chevron" \| "clock" \| "cogs" \| "comment" \| "document" \| "download" \| "envelope" \| "explanation" \| "eye" \| "filter" \| "folder" \| "grid" \| "headset" \| "integration" \| "list" \| "location" \| "megaphone" \| "minus" \| "negative" \| "pagination" \| "payment" \| "pencil" \| "person" \| "plus" \| "question" \| "receipt" \| "report" \| "search" \| "settings" \| "sick" \| "tachometer" \| "task" \| "template" \| "tool" \| "trash" \| "turn" \| "upload" \| "warning"` | `undefined` |


## Dependencies

### Used by

 - [p-button](../button)
 - [p-info-panel](../info-panel)
 - [p-navigation-item](../../molecules/navigation-item)
 - [p-pagination](../../molecules/pagination)
 - [p-segment-item](../segment-item)
 - [p-status](../status)

### Graph
```mermaid
graph TD;
  p-button --> p-icon
  p-info-panel --> p-icon
  p-navigation-item --> p-icon
  p-pagination --> p-icon
  p-segment-item --> p-icon
  p-status --> p-icon
  style p-icon fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
