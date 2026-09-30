import type {
  GenerationParams,
  GenerationRecord,
  ProcessingType,
  UploadFileMeta
} from "./types";

export interface GenerateRequest {
  file: UploadFileMeta | null;
  type: ProcessingType;
  params: GenerationParams;
}

export interface GenerateResponse {
  record: GenerationRecord;
  durationMs: number;
}

let requestCounter = 105;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function requestGeneration(input: GenerateRequest): Promise<GenerateResponse> {
  await wait(2200);

  const id = "gen-" + requestCounter++;
  const typeLabel =
    input.type === "image" ? "Изображение" : input.type === "text" ? "Текст" : "Автоматизация";
  const now = new Date().toISOString();

  const record: GenerationRecord = {
    id,
    date: now,
    type: input.type,
    projectId: "new-generation",
    projectName: "Новая генерация",
    status: "completed",
    title: (input.file?.name ?? "Новый результат").replace(/\.[^.]+$/, ""),
    result: input.params.count + " " + plural(input.params.count),
    description:
      "Demo-результат, сгенерированный локально. Страница и архитектура готовы к подключению настоящего AI API.",
    preview:
      typeLabel +
      " · " +
      input.params.quality +
      " · " +
      input.params.format +
      (input.file ? " · из " + input.file.name : "")
  };

  return {
    record,
    durationMs: 2200
  };
}

function plural(count: number): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) return "результат";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "результата";
  return "результатов";
}
