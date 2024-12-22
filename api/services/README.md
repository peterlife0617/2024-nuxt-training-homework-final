# API Services 使用說明

本專案使用 Composition API 風格的服務層結構，並提供智慧型 VSCode Snippet 來快速產生程式碼。

## 使用方式

使用 `!api-service` 指令：

- 系統會自動根據檔名判斷是一般或詳細資料的 API 服務
- 輸入 `!api-service` 後按 Tab
- 在 return 物件中加入需要的 API 方法

## 命名規則

- 一般檔案（如 `example.ts`）：

  ```typescript
  export function useExampleApi() {
    const BASE_PATH = '/example'
    const api = useApiFactory(apiInstance)

    return {

    }
  }
  ```

- 動態路由檔案（如 `example-[id].ts`）：

  ```typescript
  export function useExampleDetailApi() {
    const BASE_PATH = '/example'
    const DETAIL_PATH = (id: string) => `${BASE_PATH}/${id}`
    const api = useApiFactory(apiInstance)

    return {

    }
  }
  ```

## 注意事項

- API 服務統一使用 `useApiFactory` 來建立
- BASE_PATH 應與 API 端點路徑一致
- 詳細資料的 API 應使用 DETAIL_PATH 方法
