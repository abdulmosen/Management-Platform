
import { GoogleGenAI } from "@google/genai";
// FIX: Add .ts extension to file path to resolve module error.
import { Fine, Status } from '../types.ts';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we assume the key is provided.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const analyzeFinesWithGemini = async (fines: Fine[]): Promise<string> => {
  if (!API_KEY) {
    return "خطأ: مفتاح API الخاص بـ Gemini غير متوفر. يرجى إعداده للمتابعة.";
  }

  const finesDetails = fines
    // FIX: Used Status.Unpaid enum for filtering instead of a hardcoded string.
    .filter(f => f.status === Status.Unpaid)
    .map(f => `- ${f.description} (من ${f.authority}) بقيمة ${f.amount} ريال`).join('\n');
  
  if (finesDetails.length === 0) {
    return "لا توجد مخالفات غير مدفوعة لتحليلها. عمل رائع!";
  }

  const prompt = `
    أنا صاحب محل تجاري في السعودية وهذه قائمة بمخالفاتي الحالية غير المدفوعة:
    ${finesDetails}

    بصفتك مستشارًا خبيرًا في أنظمة الأعمال السعودية، قم بتحليل هذه المخالفات وقدم لي تقريرًا موجزًا وواضحًا باللغة العربية يتضمن ما يلي:
    1.  **تحليل الأسباب الجذرية:** ما هي الأسباب المحتملة والمتكررة لهذه المخالفات؟ (مثال: إهمال إداري، عدم متابعة التواريخ، نقص في الوعي باللوائح).
    2.  **توصيات وقائية:** قدم قائمة من 3 إلى 5 توصيات عملية ومحددة يمكنني تطبيقها لتجنب هذه المخالفات في المستقبل.
    3.  **نبرة التقرير:** يجب أن تكون النبرة احترافية، مشجعة، وسهلة الفهم.

    قم بتنسيق الرد باستخدام Markdown لسهولة القراءة.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "عذرًا، حدث خطأ أثناء الاتصال بمساعد الذكاء الاصطناعي. يرجى المحاولة مرة أخرى لاحقًا.";
  }
};
