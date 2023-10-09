# Toast

## Usage:

```html
<p-toast header="Header!" content="Description!" />

<!-- or -->
<p-toast>
    <p slot="header">Header!</p>
    <p slot="description">Description!</p>
</p-toast>
```

<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description                       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Default      |
| ------------------ | -------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `actionIcon`       | `action-icon`        | Icon to show on the button        | `"arrow" \| "attachment" \| "bread" \| "calendar" \| "camera" \| "car" \| "checklist" \| "checkmark" \| "chevron" \| "clock" \| "colleagues" \| "cogs" \| "comment" \| "companies" \| "document" \| "download" \| "envelope" \| "explanation" \| "eye" \| "faBuilding" \| "faPiggy" \| "filter" \| "folder" \| "formula" \| "grid" \| "headset" \| "integration" \| "list" \| "location" \| "megaphone" \| "menu" \| "minus" \| "more" \| "negative" \| "notification" \| "pagination" \| "payment" \| "pencil" \| "person" \| "plan" \| "plus" \| "question" \| "reload" \| "receipt" \| "report" \| "search" \| "settings" \| "sick" \| "signout" \| "switch" \| "tachometer" \| "task" \| "template" \| "tool" \| "trash" \| "turn" \| "upload" \| "warning"` | `'negative'` |
| `actionIconFlip`   | `action-icon-flip`   | Icon flip                         | `"horizontal" \| "vertical"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `undefined`  |
| `actionIconRotate` | `action-icon-rotate` | Icon rotate                       | `-135 \| -180 \| -225 \| -25 \| -270 \| -315 \| -45 \| -90 \| 0 \| 135 \| 180 \| 225 \| 25 \| 270 \| 315 \| 45 \| 90`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `undefined`  |
| `content`          | `content`            | The content of the toast          | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`  |
| `enableAction`     | `enable-action`      | Wether to enable the close button | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `true`       |
| `header`           | `header`             | The header of the toast           | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `undefined`  |
| `variant`          | `variant`            | The variant of the toast          | `"negative" \| "positive" \| "unbiased"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `'positive'` |


## Events

| Event    | Description        | Type                      |
| -------- | ------------------ | ------------------------- |
| `action` | Button click event | `CustomEvent<MouseEvent>` |


## Dependencies

### Depends on

- [p-button](../../atoms/button)

### Graph
```mermaid
graph TD;
  p-toast --> p-button
  p-button --> p-icon
  p-button --> p-loader
  style p-toast fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
