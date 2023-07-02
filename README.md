# `ellma`

Easy LLM Assistants

## How to use `ellma`

Install it with your preferred package manager.

```bash
# npm
npm i ellma

# pnpm
pnpm add ellma

# yarn
yarn add ellma
```

Import or create an integration.

```ts
import { useChat } from 'ellma'
import { openai } from 'ellma/integrations'

const integration = openai({ apiKey: 'your-private-api-key' })
const { factory, model } = useChat({ integration })

const greeting = factory.human({ text: 'Good morning!' })
const reply = await model.generate(greeting)

console.log(reply.text) // 'Good morning! How may I assist you today?'
```

## How to contribute to `ellma`

Things are still early stage, but if you want to contribute, you'll need to understand a few concepts.

### Concepts

#### Peripherals

In order to keep this library flexible, while also maintaining reasonable defaults, features that relate to _external_ runtime functionality should be implemented with the adapter pattern. In this library, the adapter pattern consists of 2 main concepts: the **peripheral** and the **adapter**. The peripheral should define the _internal_ interface that we will use throughout the codebase. The adapter should map that _internal_ interface to the _external_ interface that a given implementation provides. Some examples of this are:

- Making HTTP requests
- Getting input from or displaying output to a user
- Storing data temporarily or permanently

##### Example: Getting input from or displaying output to a user

To better understand this concept, take a look at [the `io` implementation under `./peripherals`](./peripherals/src/io/index.ts). The adapter interface is defined by `IoAdapter` as an object that has two async function properties: `read` and `write`. The `terminal` adapter conforms to that interface, and the `useIo` peripheral maps the `terminal` adapter to the `IoPeripheral` interface. This allows us to use the `IoPeripheral` interface throughout the codebase without knowledge about specific implementations that end-users might choose to use. Additionally, we can expose helper functions in the peripheral that utilize the underlying adapter interface without requiring adapters to implement the function directly. The `prompt` function is one example that uses the `write` function to output something to a user followed by the `read` function to receive user input.

#### Models

These are the various types of AI models that we can use in our agents. Models are responsible for taking input and producing output. They can be used in a variety of ways, but they are typically used as the higher-level building blocks of an agent. For example, a model might be used to generate a response to a user's input, or it might be used to generate a new piece of content based on a given prompt. Some examples of this are:

- Chat-based LLMs
- Completion-based LLMs
- Text-to-embedding transformers

#### Integrations

These are the interfaces that allow us to communicate with third-party services. Integrations wrap the functionality of a third-party service so that we can use them in our models or even our peripherals. Some examples of this are:

- OpenAI
- PaLM 2

### Set up your development environment

Clone the repo to your machine.

```bash
git clone git@github.com:davidmyersdev/ellma.git
```

Install dependencies with `pnpm`.

```bash
# ~/path/to/ellma
pnpm i
```

Create your `.env` file.

```bash
# ~/path/to/ellma
cp .env.example .env
```

Add your OpenAI API key and (optionally) add your organization and user keys if you have them.

```bash
# ~/path/to/ellma/.env
VITE_OPENAI_API_KEY=your-api-key
# The rest are optional.
VITE_OPENAI_ORGANIZATION=
VITE_OPENAI_USER_ID=
```

Run an action with `pnpm ellma <action>`. To start a conversation with ChatGPT, run the following command.

```bash
# ~/path/to/ellma
pnpm ellma chat
```
