export type MetaData = {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

type EvaluationResult = {
  score: number;
  titleFeedback: string;
  descriptionFeedback: string;
  keywordsFeedback: string;
};

/**
 * Функцията оценява мета данни (заглавие, описание и ключови думи),
 * като изчислява резултат на базата на оптималната им дължина и съдържание.
 *
 * Оценката се извършва на базата на следните правила:
 * 1. Мета заглавие: Оценява се оптималната дължина между 50-60 знака.
 * 2. Мета описание: Оценява се оптималната дължина между 120-160 знака.
 * 3. Мета ключови думи: Оценява се броят на ключовите думи в диапазона 1-10.
 *
 * Възможни отзиви за всяка категория:
 * - Положителни: Ако дължината или броят на ключовите думи е в оптималния диапазон.
 * - Допустими: Ако стойностите са приемливи, но не идеални.
 * - Неоптимални: Ако стойностите не отговарят на препоръчителните параметри.
 *
 * Функцията връща резултат, който включва общ резултат от оценката, както и конкретни отзиви за всяка категория.
 *
 * @param metaData - обект с мета данни (metaTitle, metaDescription, metaKeywords)
 * @returns EvaluationResult - резултат от оценката
 */
export function evaluateMetaData(metaData: MetaData): EvaluationResult {
  let score = 0;
  let titleFeedback = "";
  let descriptionFeedback = "";
  let keywordsFeedback = "";

  if (metaData.metaTitle) {
    const titleLength = metaData.metaTitle.length;
    if (titleLength >= 50 && titleLength <= 60) {
      score += 30;
      titleFeedback = "Дължината на мета заглавието е оптимална.";
    } else if (titleLength >= 30 && titleLength <= 70) {
      score += 15;
      titleFeedback = "Дължината на мета заглавието е приемлива, но може да се подобри.";
    } else {
      titleFeedback = "Дължината на мета заглавието не е оптимална. Стремете се към 50-60 знака.";
    }
  } else {
    titleFeedback = "Мета заглавието липсва.";
  }

  if (metaData.metaDescription) {
    const descriptionLength = metaData.metaDescription.length;
    if (descriptionLength >= 120 && descriptionLength <= 160) {
      score += 30;
      descriptionFeedback = "Дължината на мета описанието е оптимална.";
    } else if (descriptionLength >= 100 && descriptionLength <= 180) {
      score += 15;
      descriptionFeedback = "Дължината на мета описанието е приемлива, но може да се подобри.";
    } else {
      descriptionFeedback = "Дължината на мета описанието не е оптимална. Стремете се към 120-160 знака.";
    }
  } else {
    descriptionFeedback = "Мета описанието липсва.";
  }

  if (metaData.metaKeywords) {
    const keywordsArray = metaData.metaKeywords.split(",").map((k) => k.trim());
    if (keywordsArray.length > 0 && keywordsArray.length <= 10) {
      score += 30;
      keywordsFeedback = "Броят на мета ключовите думи е оптимален.";
    } else if (keywordsArray.length > 10 && keywordsArray.length <= 20) {
      score += 15;
      keywordsFeedback = "Броят на мета ключовите думи е приемлив, но може да се намали.";
    } else {
      keywordsFeedback = "Броят на мета ключовите думи не е оптимален. Използвайте 1-10 ключови думи.";
    }
  } else {
    keywordsFeedback = "Мета ключовите думи липсват.";
  }

  return {
    score: Math.min(Math.round(score), 100),
    titleFeedback,
    descriptionFeedback,
    keywordsFeedback,
  };
}