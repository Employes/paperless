# Button

## Usage:

```html
<p-button>Label</p-button>
```

<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description                                  | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Default     |
| -------------- | --------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `chevron`      | `chevron`       | Wether to show a chevron or not              | `"down" \| "up" \| boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `false`     |
| `disabled`     | `disabled`      | Wether the button is disabled                | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`     |
| `href`         | `href`          | Href in case of "text" version               | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `undefined` |
| `icon`         | `icon`          | Icon to show on the button                   | `"arrow" \| "attachment" \| "bread" \| "calendar" \| "car" \| "checklist" \| "checkmark" \| "chevron" \| "clock" \| "cogs" \| "comment" \| "document" \| "download" \| "envelope" \| "explanation" \| "eye" \| "filter" \| "folder" \| "grid" \| "headset" \| "integration" \| "list" \| "location" \| "megaphone" \| "menu" \| "minus" \| "more" \| "negative" \| "pagination" \| "payment" \| "pencil" \| "person" \| "plus" \| "question" \| "receipt" \| "report" \| "search" \| "settings" \| "sick" \| "signout" \| "switch" \| "tachometer" \| "task" \| "template" \| "tool" \| "trash" \| "turn" \| "upload" \| "warning"` | `undefined` |
| `iconFlip`     | `icon-flip`     | Icon flip                                    | `"horizontal" \| "vertical"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `undefined` |
| `iconOnly`     | `icon-only`     | Wether the button is icon only               | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`     |
| `iconPosition` | `icon-position` | Icon position                                | `"end" \| "start"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `'end'`     |
| `iconRotate`   | `icon-rotate`   | Icon rotate                                  | `-135 \| -180 \| -225 \| -25 \| -270 \| -315 \| -45 \| -90 \| 0 \| 135 \| 180 \| 225 \| 25 \| 270 \| 315 \| 45 \| 90`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `undefined` |
| `inheritText`  | `inherit-text`  | Wether the button should inherit text styles | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`     |
| `loading`      | `loading`       | Wether to show a loader or not               | `boolean`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `false`     |
| `size`         | `size`          | The size of the button                       | `"medium" \| "small"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `'medium'`  |
| `target`       | `target`        | Target in case of "text" version             | `string`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `undefined` |
| `variant`      | `variant`       | The variant of the button                    | `"primary" \| "secondary" \| "text"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `'primary'` |
| `width`        | `width`         | The width of the button                      | `"auto" \| "full"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `'auto'`    |


## Events

| Event     | Description        | Type                      |
| --------- | ------------------ | ------------------------- |
| `onClick` | Button click event | `CustomEvent<MouseEvent>` |


## Dependencies

### Used by

 - [p-navbar](../../organisms/navbar)

### Depends on

- [p-loader](../loader)
- [p-icon](../icon)

### Graph
```mermaid
graph TD;
  p-button --> p-loader
  p-button --> p-icon
  p-navbar --> p-button
  style p-button fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
