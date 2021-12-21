# hubot-wolfram-alpha

:warning: This project is no longer maintained. :warning:

[Wolfram Alpha][wfa] integration for [Hubot][hubot]. Emits [Slack][slack]-formatted attachments.

# Example

![example](https://cloud.githubusercontent.com/assets/3905798/19982108/18195ff0-a1db-11e6-966a-ebea0dfd8770.png)

# Installation

In your Hubot repository, run

```bash
$ npm install --save hubot-wolfram-alpha
```

Then add **hubot-wolfram-alpha** to your `external-scripts.json`.

```json
["hubot-wolfram-alpha"]
```

# Configuration

```
WOLFRAM_ALPHA_APPID - The API key for your Wolfram Alpha application
```

# Commands

```
hubot wolfram <query> - Displays Wolfram Alpha results for <query>
hubot wfa <query> - Displays Wolfram Alpha results for <query>
```

# License

[MIT][license]

[hubot]: https://hubot.github.com/
[license]: LICENSE
[slack]: https://slack.com/
[wfa]: http://www.wolframalpha.com/
