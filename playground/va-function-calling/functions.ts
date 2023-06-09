import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { id } from 'vellma'
import { fileStorage, useStorage } from 'vellma/peripherals'

const thisDir = dirname(fileURLToPath(import.meta.url))
const db = useStorage(fileStorage(join(thisDir, 'events.json')))

export const functions = {
  addEventToCalendar: {
    handler: async (args: { name: string, timestamp: string, description?: string }) => {
      const event = { ...args, id: id() }

      await db.set(event.id, event)

      return { event, success: true }
    },
    schema: {
      name: 'addEventToCalendar',
      description: 'Add an event to the calendar.',
      parameters: {
        type: 'object',
        properties: {
          description: {
            type: 'string',
            description: 'A description of the event, if applicable.',
          },
          name: {
            type: 'string',
            description: 'The name of the event.',
          },
          timestamp: {
            type: 'string',
            description: 'An ISO-8601 timestamp (including timezone) for the event.',
          },
        },
        required: ['name', 'timestamp'],
      },
    },
  },
}
