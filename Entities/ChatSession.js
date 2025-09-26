{
  "name": "ChatSession",
  "type": "object",
  "properties": {
    "user_message": {
      "type": "string",
      "description": "User's original query or symptom"
    },
    "bot_response": {
      "type": "string",
      "description": "AI generated response"
    },
    "follow_up_questions": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "question": {
            "type": "string"
          },
          "answer": {
            "type": "string"
          }
        }
      },
      "description": "Follow-up questions and user answers"
    },
    "language": {
      "type": "string",
      "description": "Language used for this conversation"
    },
    "severity_assessment": {
      "type": "string",
      "enum": [
        "low",
        "medium",
        "high",
        "emergency"
      ],
      "description": "Assessed severity based on symptoms"
    },
    "session_type": {
      "type": "string",
      "enum": [
        "symptom_check",
        "general_health",
        "preventive_care",
        "emergency"
      ],
      "description": "Type of consultation session"
    }
  },
  "required": [
    "user_message",
    "bot_response",
    "language"
  ],
  "rls": {
    "read": {
      "$or": [
        {
          "created_by": "{{user.email}}"
        },
        {
          "user_condition": {
            "role": "admin"
          }
        }
      ]
    },
    "write": {
      "created_by": "{{user.email}}"
    }
  }
}
