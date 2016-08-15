# hubot-wolfram-alpha

[Wolfram Alpha][wfa] integration for [Hubot][hubot]. Emits slack-formatted attachments.

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

[wfa]: http://www.wolframalpha.com/
[hubot]: https://hubot.github.com/
