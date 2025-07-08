import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Todo: a
    .model({
      title: a.string().required(),
      description: a.string(),
      dueDate: a.datetime(),
      status: a.enum(['todo', 'inProgress', 'completed']),
    })
    .authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
