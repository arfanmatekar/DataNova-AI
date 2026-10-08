export type FileAnalysis = {
  name: string;
  type: "csv" | "json" | "txt" | "pdf" | "docx" | "unsupported";
  size: number;
  recordCount: number;
  columns: string[];
  preview: string[];
  summary: string;
};

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

function readText(file: File): Promise<string> {
  return file.text();
}

function parseCsv(text: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { columns: [], rows: [] as string[][] };
  }

  const [headerLine, ...dataLines] = lines;
  const columns = headerLine
    .split(",")
    .map((column) => column.trim())
    .filter(Boolean);

  const rows = dataLines.map((line) =>
    line.split(",").map((cell) => cell.trim()));

  return { columns, rows };
}

function parseJson(text: string) {
  const data = JSON.parse(text);
  if (Array.isArray(data)) {
    return { recordCount: data.length, columns: Object.keys(data[0] ?? {}), preview: data.slice(0, 3).map((item) => JSON.stringify(item)) };
  }
  if (data && typeof data === "object") {
    const entries = Object.values(data);
    const array = Array.isArray(entries[0]) ? entries[0] : entries;
    return { recordCount: Array.isArray(array) ? array.length : 1, columns: Object.keys(data), preview: [JSON.stringify(data)] };
  }
  return { recordCount: 0, columns: [], preview: [] };
}

export async function analyzeUploadedFile(file: File): Promise<FileAnalysis> {
  if (file.size > MAX_SIZE_BYTES) {
    throw new Error("File is larger than 5 MB. Please upload a smaller file.");
  }

  const extension = file.name.toLowerCase().split(".").pop() ?? "";
  const lowerName = file.name.toLowerCase();

  if (extension === "csv" || file.type === "text/csv") {
    const text = await readText(file);
    const { columns, rows } = parseCsv(text);
    const preview = rows.slice(0, 3).map((row) => row.join(" | "));

    return {
      name: file.name,
      type: "csv",
      size: file.size,
      recordCount: rows.length,
      columns,
      preview,
      summary: `${rows.length} records found across ${columns.length} columns.`,
    };
  }

  if (extension === "json" || file.type === "application/json") {
    const text = await readText(file);
    const parsed = parseJson(text);

    return {
      name: file.name,
      type: "json",
      size: file.size,
      recordCount: parsed.recordCount,
      columns: parsed.columns,
      preview: parsed.preview,
      summary: `${parsed.recordCount} JSON record${parsed.recordCount === 1 ? "" : "s"} detected.`,
    };
  }

  if (extension === "txt" || file.type.startsWith("text/")) {
    const text = await readText(file);
    const lines = text.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

    return {
      name: file.name,
      type: "txt",
      size: file.size,
      recordCount: lines.length,
      columns: ["text"],
      preview: lines.slice(0, 3),
      summary: `${lines.length} text line${lines.length === 1 ? "" : "s"} detected.`,
    };
  }

  if (extension === "pdf" || lowerName.endsWith(".pdf") || file.type === "application/pdf") {
    return {
      name: file.name,
      type: "pdf",
      size: file.size,
      recordCount: 0,
      columns: ["document text"],
      preview: ["PDF text extraction is available after connecting the document processing service."],
      summary: "PDF recognized. Connect a document-processing service for full text extraction.",
    };
  }

  if (extension === "docx" || lowerName.endsWith(".docx") || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    return {
      name: file.name,
      type: "docx",
      size: file.size,
      recordCount: 0,
      columns: ["document text"],
      preview: ["DOCX text extraction is available after connecting the document processing service."],
      summary: "DOCX recognized. Connect a document-processing service for full text extraction.",
    };
  }

  return {
    name: file.name,
    type: "unsupported",
    size: file.size,
    recordCount: 0,
    columns: [],
    preview: [],
    summary: "This file type is not supported yet. Try CSV, JSON, TXT, PDF, or DOCX.",
  };
}
