{
  "name": "HealthContent",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "Content title"
    },
    "content": {
      "type": "string",
      "description": "Medical content text"
    },
    "language": {
      "type": "string",
      "description": "Content language"
    },
    "category": {
      "type": "string",
      "enum": [
        "symptoms",
        "diseases",
        "prevention",
        "first_aid",
        "emergency",
        "general"
      ],
      "description": "Content category"
    },
    "keywords": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Search keywords for content matching"
    },
    "severity_level": {
      "type": "string",
      "enum": [
        "info",
        "caution",
        "urgent"
      ],
      "description": "Medical urgency level"
    },
    "doctor_verified": {
      "type": "boolean",
      "default": false,
      "description": "Whether content is doctor-verified"
    }
  },
  "required": [
    "title",
    "content",
    "language",
    "category"
  ]
}
