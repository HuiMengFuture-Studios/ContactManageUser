# 个人事务管理系统（前端）

## 概述

《个人事务管理系统》旨在为用户提供一个高效、便捷的解决方案，用于管理日常任务与维护人际关系。无论是跟踪即将到来的截止日期、安排重要会议，还是维持与朋友和家人的联系，本系统都能提供必要的工具和支持，帮助您轻松打理个人事务，确保一切井井有条。

## 开发者

©2025 [辉梦未来网络科技工作室](https://www.huimengfuture.xyz) 版权所有.

## 许可证

Apache-2.0

## 功能列表（见API文档）

嘻嘻

## API文档

### 前述

我们热诚欢迎广大用户对本项目进行二次开发，期待您能贡献更优秀的解决方案和创新功能。您的参与和贡献是我们前进的动力，无论是改进现有功能还是添加新特性，我们都鼓励您提交Pull
Request，一起推动项目的发展与完善。

### 1. DailySummary（每日总结）

- **创建新每日总结**
  - 地址: `/dailySummary`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "date": "YYYY-MM-DD",
      "summary": "string"
    }
    ```


- **获取所有每日总结**
  - 地址: `/dailySummary`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个每日总结**
  - 地址: `/dailySummary/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新每日总结**
  - 地址: `/dailySummary/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "date": "YYYY-MM-DD",
      "summary": "string"
    }
    ```


- **删除每日总结**
  - 地址: `/dailySummary/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 2. AnnualSummary（年度总结）

- **创建新年度总结**
  - 地址: `/annualSummary`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "year": integer,
      "summary": "string"
    }
    ```


- **获取所有年度总结**
  - 地址: `/annualSummary`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个年度总结**
  - 地址: `/annualSummary/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新年度总结**
  - 地址: `/annualSummary/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "year": integer,
      "summary": "string"
    }
    ```


- **删除年度总结**
  - 地址: `/annualSummary/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 3. AnnualPlan（年度计划）

- **创建新年度计划**
  - 地址: `/annualPlan`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "year": integer,
      "goals": "string"
    }
    ```


- **获取所有年度计划**
  - 地址: `/annualPlan`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个年度计划**
  - 地址: `/annualPlan/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新年度计划**
  - 地址: `/annualPlan/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "year": integer,
      "goals": "string"
    }
    ```


- **删除年度计划**
  - 地址: `/annualPlan/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 4. DailyPlan（每日计划）

- **创建新每日计划**
  - 地址: `/dailyPlan`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "date": "YYYY-MM-DD",
      "tasks": "string"
    }
    ```


- **获取所有每日计划**
  - 地址: `/dailyPlan`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个每日计划**
  - 地址: `/dailyPlan/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新每日计划**
  - 地址: `/dailyPlan/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "date": "YYYY-MM-DD",
      "tasks": "string"
    }
    ```


- **删除每日计划**
  - 地址: `/dailyPlan/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 5. MonthlySummary（月度总结）

- **创建新月度总结**
  - 地址: `/monthlySummary`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "month": "string",
      "summary": "string"
    }
    ```


- **获取所有月度总结**
  - 地址: `/monthlySummary`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个月度总结**
  - 地址: `/monthlySummary/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新月度总结**
  - 地址: `/monthlySummary/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "month": "string",
      "summary": "string"
    }
    ```


- **删除月度总结**
  - 地址: `/monthlySummary/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 6. MediaList（观影/读书清单）

- **创建新观影/读书清单**
  - 地址: `/mediaList`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "title": "string",
      "type": "movie" | "book",
      "description": "string"
    }
    ```


- **获取所有观影/读书清单**
  - 地址: `/mediaList`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个观影/读书清单**
  - 地址: `/mediaList/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新观影/读书清单**
  - 地址: `/mediaList/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "title": "string",
      "type": "movie" | "book",
      "description": "string"
    }
    ```


- **删除观影/读书清单**
  - 地址: `/mediaList/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 7. Contact（联系人）

- **创建新联系人**
  - 地址: `/contacts`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "name": "string",
      "phone": "string",
      "email": "string",
	  "relationship" :"string",
	  "source" :"string"
    }
    ```


- **获取所有联系人**
  - 地址: `/contacts`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个联系人**
  - 地址: `/contacts/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新联系人**
  - 地址: `/contacts/:id`
  - 方法: `PUT`
  - 格式:
    ```json
     {
      "name": "string",
      "phone": "string",
      "email": "string",
	  "relationship" :"string",
	  "source" :"string"
    }
    ```


- **删除联系人**
  - 地址: `/contacts/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 8. Transaction（事务）

- **创建新事务**
  - 地址: `/transactions`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DDTHH:mm:ssZ"
    }
    ```


- **获取所有事务**
  - 地址: `/transactions`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个事务**
  - 地址: `/transactions/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新事务**
  - 地址: `/transactions/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "title": "string",
      "description": "string",
      "dueDate": "YYYY-MM-DDTHH:mm:ssZ"
    }
    ```


- **删除事务**
  - 地址: `/transactions/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 9. Favor（人情往来）

- **创建新人情往来**
  - 地址: `/favors`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "contactId": integer,
      "amount": float,
      "description": "string",
      "date": "YYYY-MM-DDTHH:mm:ssZ"
    }
    ```


- **获取所有人情往来**
  - 地址: `/favors`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个人情往来**
  - 地址: `/favors/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新人情往来**
  - 地址: `/favors/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "contactId": integer,
      "amount": float,
      "description": "string",
      "date": "YYYY-MM-DDTHH:mm:ssZ"
    }
    ```


- **删除人情往来**
  - 地址: `/favors/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 10. Wishlist（愿望清单）

- **创建新愿望清单**
  - 地址: `/wishlists`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "item": "string",
      "description": "string",
      "priority": "low" | "medium" | "high"
    }
    ```


- **获取所有愿望清单**
  - 地址: `/wishlists`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个愿望清单**
  - 地址: `/wishlists/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新愿望清单**
  - 地址: `/wishlists/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "item": "string",
      "description": "string",
      "priority": "low" | "medium" | "high"
    }
    ```


- **删除愿望清单**
  - 地址: `/wishlists/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 11. MonthlyPlan（月度计划）

- **创建新月度计划**
  - 地址: `/monthlyPlan`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "month": "string",
      "goals": "string"
    }
    ```


- **获取所有月度计划**
  - 地址: `/monthlyPlan`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个月度计划**
  - 地址: `/monthlyPlan/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新月度计划**
  - 地址: `/monthlyPlan/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "month": "string",
      "goals": "string"
    }
    ```


- **删除月度计划**
  - 地址: `/monthlyPlan/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 12. Interest（个人喜好）

- **创建新个人喜好**
  - 地址: `/interests`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "name": "string",
      "category": "hobby" | "food",
      "description": "string"
    }
    ```


- **获取所有个人喜好**
  - 地址: `/interests`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个个人喜好**
  - 地址: `/interests/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新个人喜好**
  - 地址: `/interests/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "name": "string",
      "category": "hobby" | "food",
      "description": "string"
    }
    ```


- **删除个人喜好**
  - 地址: `/interests/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---

### 13. Credit（信用评分）

- **计算并更新个人信用评分**
  - 地址: `/credits/calculate`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "contactId": integer
    }
    ```


- **获取个人信用评分**
  - 地址: `/credits/:id`
  - 方法: `GET`
  - 格式: 无请求体


- **批量计算信用评分（所有联系人）**
  - 地址: `/credits/calculateAll`
  - 方法: `POST`
  - 格式: 无请求体

---

### 14. Finance（财务记录）

- **创建新财务记录**
  - 地址: `/finances`
  - 方法: `POST`
  - 格式:
    ```json
    {
      "amount": float,
      "description": "string",
      "date": "YYYY-MM-DDTHH:mm:ssZ",
      "type": "income" | "expense"
    }
    ```


- **获取所有财务记录**
  - 地址: `/finances`
  - 方法: `GET`
  - 格式: 无请求体

- **获取单个财务记录**
  - 地址: `/finances/:id`
  - 方法: `GET`
  - 格式: 无请求体

- **更新财务记录**
  - 地址: `/finances/:id`
  - 方法: `PUT`
  - 格式:
    ```json
    {
      "amount": float,
      "description": "string",
      "date": "YYYY-MM-DDTHH:mm:ssZ",
      "type": "income" | "expense"
    }
    ```


- **删除财务记录**
  - 地址: `/finances/:id`
  - 方法: `DELETE`
  - 格式: 无请求体

---
