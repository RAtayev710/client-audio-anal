import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class UploadCallInfoCallInfoDto {
  @ApiProperty({ name: 'чем_интересовался_клиент' })
  @Expose({ name: 'чем_интересовался_клиент' })
  clientInterest: string;

  @ApiProperty({ name: 'кто_управляет_беседой' })
  @Expose({ name: 'кто_управляет_беседой' })
  conversationDriver: string;

  @ApiProperty({ name: 'суть_звонка' })
  @Expose({ name: 'суть_звонка' })
  essence: string;

  @ApiProperty({ name: 'выявленная_проблема' })
  @Expose({ name: 'выявленная_проблема' })
  identifiedProblem: string;

  @ApiProperty({ name: 'инициатор_тем' })
  @Expose({ name: 'инициатор_тем' })
  initiatorOfTopics: string;

  @ApiProperty({ name: 'дата_следующего_контакта' })
  @Expose({ name: 'дата_следующего_контакта' })
  nextContactDate: string;

  @ApiProperty({ name: 'статус_решения_проблемы' })
  @Expose({ name: 'статус_решения_проблемы' })
  problemResolutionStatus: string;
}

@Exclude()
export class UploadCallInfoClientRelativeDataDto {
  @ApiProperty({ name: 'возраст' })
  @Expose({ name: 'возраст' })
  age: string;

  @ApiProperty({ name: 'степень_родства' })
  @Expose({ name: 'степень_родства' })
  degreeOfKinship: string;

  @ApiProperty({ name: 'имя' })
  @Expose({ name: 'имя' })
  name: string;

  @ApiProperty({ name: 'место_работы' })
  @Expose({ name: 'место_работы' })
  placeOfWork: string;
}

@Exclude()
export class UploadCallInfoClientDataDto {
  @ApiProperty({ name: 'возраст' })
  @Expose({ name: 'возраст' })
  age: string;

  @ApiProperty({ name: 'причина_оценки_возраста' })
  @Expose({ name: 'причина_оценки_возраста' })
  ageAssessmentReason: string;

  @ApiProperty({ name: 'наличие_детей' })
  @Expose({ name: 'наличие_детей' })
  havingChildren: string;

  @ApiProperty({ name: 'хобби_и_интересы' })
  @Expose({ name: 'хобби_и_интересы' })
  hobbies: string;

  @ApiProperty({ name: 'должность' })
  @Expose({ name: 'должность' })
  jobTitle: string;

  @ApiProperty({ name: 'семейное_положение' })
  @Expose({ name: 'семейное_положение' })
  maritalStatus: string;

  @ApiProperty({ name: 'имя' })
  @Expose({ name: 'имя' })
  name: string;

  @ApiProperty({ name: 'где_живет_клиент' })
  @Expose({ name: 'где_живет_клиент' })
  placeOfResidence: string;

  @ApiProperty({ name: 'место_работы' })
  @Expose({ name: 'место_работы' })
  placeOfWork: string;

  @ApiProperty({ name: 'информация_о_близких' })
  @Expose({ name: 'информация_о_близких' })
  @Type(() => UploadCallInfoClientRelativeDataDto)
  relativeInfo: UploadCallInfoClientRelativeDataDto;

  @ApiProperty({ name: 'пол' })
  @Expose({ name: 'пол' })
  sex: string;

  @ApiProperty({ name: 'сфера_деятельности' })
  @Expose({ name: 'сфера_деятельности' })
  sphereOfActivity: string;
}

@Exclude()
export class UploadCallInfoClientInsightDto {
  @ApiProperty({ name: 'категории', type: [String] })
  @Expose({ name: 'категории' })
  categories: string[];

  @ApiProperty({ name: 'интенсивность' })
  @Expose({ name: 'интенсивность' })
  intensity: number;

  @ApiProperty({ name: 'упоминания' })
  @Expose({ name: 'упоминания' })
  mentions: number;

  @ApiProperty({ name: 'тип' })
  @Expose({ name: 'тип' })
  type: string;
}

@Exclude()
export class UploadCallInfoClientInsightsInfoDto {
  @ApiProperty({ name: 'интересы' })
  @Expose({ name: 'интересы' })
  @Type(() => UploadCallInfoClientInsightDto)
  interests: UploadCallInfoClientInsightDto;

  @ApiProperty({ name: 'потребности' })
  @Expose({ name: 'потребности' })
  @Type(() => UploadCallInfoClientInsightDto)
  needs: UploadCallInfoClientInsightDto;

  @ApiProperty({ name: 'боли' })
  @Expose({ name: 'боли' })
  @Type(() => UploadCallInfoClientInsightDto)
  pain: UploadCallInfoClientInsightDto;
}

@Exclude()
export class UploadCallInfoManagerInfoDto {
  @ApiProperty({ name: 'что_должен_сделать_менеджер' })
  @Expose({ name: 'что_должен_сделать_менеджер' })
  managerTask: string;
}

@Exclude()
export class UploadCallInfoSatisfactionInfoRatingDto {
  @ApiProperty({ name: 'причина' })
  @Expose({ name: 'причина' })
  reason: string;

  @ApiProperty({ name: 'балл' })
  @Expose({ name: 'балл' })
  score: string;
}

@Exclude()
export class UploadCallInfoSatisfactionInfoDto {
  @ApiProperty({ name: 'сравнение_удовлетворенности' })
  @Expose({ name: 'сравнение_удовлетворенности' })
  comparison: string;

  @ApiProperty({ name: 'окончательная_оценка' })
  @Expose({ name: 'окончательная_оценка' })
  @Type(() => UploadCallInfoSatisfactionInfoRatingDto)
  finalRating: UploadCallInfoSatisfactionInfoRatingDto;

  @ApiProperty({ name: 'начальная_оценка' })
  @Expose({ name: 'начальная_оценка' })
  @Type(() => UploadCallInfoSatisfactionInfoRatingDto)
  initialRating: UploadCallInfoSatisfactionInfoRatingDto;

  @ApiProperty({ name: 'рекомендации', type: [String] })
  @Expose({ name: 'рекомендации' })
  recommendations: string[];
}

@Exclude()
export class UploadCallInfoResultDto {
  @ApiProperty({ name: 'информация_по_звонку' })
  @Expose({ name: 'информация_по_звонку' })
  @Type(() => UploadCallInfoCallInfoDto)
  callInfo: UploadCallInfoCallInfoDto;

  @ApiProperty({ name: 'данные_о_клиенте' })
  @Expose({ name: 'данные_о_клиенте' })
  @Type(() => UploadCallInfoClientDataDto)
  clientData: UploadCallInfoClientDataDto;

  @ApiProperty({ name: 'классификация_инсайтов_клиента' })
  @Expose({ name: 'классификация_инсайтов_клиента' })
  @Type(() => UploadCallInfoClientInsightsInfoDto)
  clientInsightsInfo: UploadCallInfoClientInsightsInfoDto;

  @ApiProperty({ name: 'информация_по_менеджеру' })
  @Expose({ name: 'информация_по_менеджеру' })
  @Type(() => UploadCallInfoManagerInfoDto)
  managerInfo: UploadCallInfoManagerInfoDto;

  @ApiProperty({ name: 'удовлетворенность_клиента' })
  @Expose({ name: 'удовлетворенность_клиента' })
  @Type(() => UploadCallInfoSatisfactionInfoDto)
  satisfactionInfo: UploadCallInfoSatisfactionInfoDto;
}

@Exclude()
export class UploadCallInfoInfoDto {
  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  @Type(() => UploadCallInfoResultDto)
  result: UploadCallInfoResultDto;
}

@Exclude()
export class UploadCallInfoRequest {
  @ApiProperty({ name: 'call_info_id' })
  @Expose({ name: 'call_info_id' })
  callId: number;

  @ApiProperty()
  @Expose()
  @Type(() => UploadCallInfoInfoDto)
  info: UploadCallInfoInfoDto;
}
