# Sboge - Text Adventure

The goal of this project is to create a simple text adventure in React, where the entire adventure is stored in json. These files are static and will not be changed.

The game only saves three things:

- Current Chapter
- Current Scene
- Flags ()

## About

The game is loaded from json-files. Each json-file is a `chapter`.

### Structure of a `chapter.json`

```
{
  "scenes": [
    {
      "id": "scene_1",
      "name": "Bench",
      "paragraphs": [
        "You wake up on the bench.",
        "What happened last night?"
      ],
      "actions": [
        {
          "text": "Stand up",
          "triggers": [
            {
              "type": "movement",
              "target": "scene_2"
            }
          ]
        }
      ]
    },
    {
      "id": "scene_2",
      "name": "In front of the bench",
      "paragraphs": [
        "You rise up slowly and look around.",
        {
            "text": "What is that?",
            "hideIfFlag": "coin_taken"
        },
        {
            "text": "You look at the coin. It's beautiful!",
            "showIfFlag": "coin_taken"
        }
      ],
      "actions": [
        {
          "text": "Take coin",
          "triggers": [
            {
              "type": "add_flag",
              "target": "coin_taken"
            }
          ]
        }
      ]
    }
  ]
}

```

## Triggers

Triggers are stuff that happenes when an action is performed by the player.

### Type of triggers:

#### `movement`

```
{
    "type": "movement",
    "target": "target_scene",
    "chapter": "optional_target_chapter"
}
```

#### `add_flag`

```
{
    "type": "add_flag",
    "target": "flag_to_add",
}
```

#### `remove_flag`

```
{
    "type": "add_flag",
    "target": "flag_to_remove",
}
```

## Scripts

### Install dependencies

`npm install`

### Run on localhost:3000

`npm start`

### Deploy application with gh-pages

`npm run deploy`
