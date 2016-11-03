# hubot-wolfram-alpha

[Wolfram Alpha][wfa] integration for [Hubot][hubot]. Emits [Slack][slack]-formatted attachments.

# Example

![example](https://cloud.githubusercontent.com/assets/3905798/19981854/05e93e78-a1da-11e6-8048-07e704b2f16b.png)

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
CAMO_KEY - (Optional) The shared secret key for a Camo proxy
CAMO_HOST - (Optional) The hostname for a Camo proxy
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
