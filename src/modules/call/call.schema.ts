import { JsonSchema } from '@lib/ajv/types';
import { SchemaCore } from '@lib/core';

/**
 * Schema for call related operations.
 */
class CallSchema extends SchemaCore {
  /**
   * Constructs an instance of CallSchema.
   * @constructor
   */
  constructor() {
    super(CallSchema.name);
  }

  /**
   * Generates the JSON schema for creating the call.
   * @returns {JsonSchema} The JSON schema for creating the call.
   */
  create(): JsonSchema {
    return {
      $id: this.getIdKey('create'),
      type: 'object',
      // additionalProperties: false,
      properties: {
        ...this.getInteger('call_info_id'),
        ...this.getString('client_phone'),
        ...this.getDateTime('call_date'),
        ...this.getString('call_type'),
        ...this.getInteger('call_duration'),
        ...this.getString('manager_name', { isOptional: true }),
        ...this.getString('manager_phone', { isOptional: true }),
        ...this.getInteger('org_id'),
      },
      required: [
        'call_info_id',
        'client_phone',
        'call_date',
        'call_type',
        'call_duration',
        'org_id',
      ],
    };
  }

  uploadInfo(): JsonSchema {
    return {
      $id: this.getIdKey('uploadInfo'),
      type: 'object',
      // additionalProperties: false,
      properties: {
        ...this.getInteger('call_info_id'),
        info: {
          type: 'object',
          properties: {
            ...this.getString('name'),
            result: {
              type: 'object',
              properties: {
                данные_о_клиенте: {
                  type: 'object',
                  properties: {
                    ...this.getString('имя'),
                    ...this.getString('пол'),
                    ...this.getString('возраст'),
                    ...this.getString('должность'),
                    ...this.getString('место_работы'),
                    ...this.getString('наличие_детей'),
                    ...this.getString('где_живет_клиент'),
                    ...this.getString('хобби_и_интересы'),
                    ...this.getString('семейное_положение'),
                    ...this.getString('сфера_деятельности'),
                    информация_о_близких: {
                      type: 'object',
                      properties: {
                        ...this.getString('имя'),
                        ...this.getString('возраст'),
                        ...this.getString('место_работы'),
                        ...this.getString('степень_родства'),
                      },
                      required: [
                        'имя',
                        'возраст',
                        'место_работы',
                        'степень_родства',
                      ],
                    },
                    ...this.getString('причина_оценки_возраста'),
                  },
                  required: [
                    'имя',
                    'пол',
                    'возраст',
                    'должность',
                    'место_работы',
                    'наличие_детей',
                    'где_живет_клиент',
                    'хобби_и_интересы',
                    'семейное_положение',
                    'сфера_деятельности',
                    'информация_о_близких',
                    'причина_оценки_возраста',
                  ],
                },
                информация_по_звонку: {
                  type: 'object',
                  properties: {
                    ...this.getString('суть_звонка'),
                    ...this.getString('инициатор_тем'),
                    ...this.getString('выявленная_проблема'),
                    ...this.getString('кто_управляет_беседой'),
                    ...this.getString('статус_решения_проблемы'),
                    ...this.getString('дата_следующего_контакта'),
                    ...this.getString('чем_интересовался_клиент'),
                  },
                  required: [
                    'суть_звонка',
                    'инициатор_тем',
                    'выявленная_проблема',
                    'кто_управляет_беседой',
                    'статус_решения_проблемы',
                    'дата_следующего_контакта',
                    'чем_интересовался_клиент',
                  ],
                },
                информация_по_менеджеру: {
                  type: 'object',
                  properties: {
                    ...this.getString('что_должен_сделать_менеджер'),
                  },
                  required: ['что_должен_сделать_менеджер'],
                },
                удовлетворенность_клиента: {
                  type: 'object',
                  properties: {
                    рекомендации: { type: 'array', ...this.getString('items') },
                    начальная_оценка: {
                      type: 'object',
                      properties: {
                        ...this.getString('балл'),
                        ...this.getString('причина'),
                      },
                      required: ['балл', 'причина'],
                    },
                    окончательная_оценка: {
                      type: 'object',
                      properties: {
                        ...this.getString('балл'),
                        ...this.getString('причина'),
                      },
                      required: ['балл', 'причина'],
                    },
                    ...this.getString('сравнение_удовлетворенности'),
                  },
                  required: [
                    'рекомендации',
                    'начальная_оценка',
                    'окончательная_оценка',
                    'сравнение_удовлетворенности',
                  ],
                },
                классификация_инсайтов_клиента: {
                  type: 'object',
                  properties: {
                    боли: {
                      type: 'object',
                      properties: {
                        ...this.getString('тип'),
                        категории: {
                          type: 'array',
                          ...this.getString('items'),
                        },
                        ...this.getInteger('упоминания'),
                        ...this.getInteger('интенсивность'),
                      },
                      required: [
                        'тип',
                        'категории',
                        'упоминания',
                        'интенсивность',
                      ],
                    },
                    интересы: {
                      type: 'object',
                      properties: {
                        ...this.getString('тип'),
                        категории: {
                          type: 'array',
                          ...this.getString('items'),
                        },
                        ...this.getInteger('упоминания'),
                        ...this.getInteger('интенсивность'),
                      },
                      required: [
                        'тип',
                        'категории',
                        'упоминания',
                        'интенсивность',
                      ],
                    },
                    потребности: {
                      type: 'object',
                      properties: {
                        ...this.getString('тип'),
                        категории: {
                          type: 'array',
                          ...this.getString('items'),
                        },
                        ...this.getInteger('упоминания'),
                        ...this.getInteger('интенсивность'),
                      },
                      required: [
                        'тип',
                        'категории',
                        'упоминания',
                        'интенсивность',
                      ],
                    },
                  },
                  required: ['боли', 'интересы', 'потребности'],
                },
              },
              required: [
                'данные_о_клиенте',
                'информация_по_звонку',
                'информация_по_менеджеру',
                'удовлетворенность_клиента',
                'классификация_инсайтов_клиента',
              ],
            },
          },
          required: ['name', 'result'],
        },
      },
      required: ['call_info_id', 'info'],
    };
  }
}

/**
 * Instance of CallSchema used for call schema operations.
 */
export const callSchema = new CallSchema();
