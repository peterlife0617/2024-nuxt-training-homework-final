# API Schema 使用說明

本專案使用 Zod 進行 API 回應的型別驗證，並提供智慧型 VSCode Snippet 來快速產生程式碼。

## 使用方式

使用 `!api-schema` 指令：

- 系統會自動根據檔名判斷是一般或詳細資料的 schema
- 輸入 `!api-schema` 後按 Tab
- 在物件內加入需要的欄位定義

## 命名規則

- 一般檔案（如 `example.ts`）：

  ```typescript
  export const exampleSchema = z.object({
    // ...欄位定義
  })

  export const exampleResponseSchema = apiResponseSchema(exampleSchema)
  ```

- 動態路由檔案（如 `example-[id].ts`）：

  ```typescript
  export const exampleDetailSchema = z.object({
    // ...欄位定義
  })

  export const exampleDetailResponseSchema = apiResponseSchema(exampleDetailSchema)
  ```
