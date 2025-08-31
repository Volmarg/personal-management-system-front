enum ImportActionEnum {
    multiply = "multiply",
    delete = "delete",
    reset = "reset",
}

enum ImportStepNameEnum {
    upload = "upload",
    mapping = "mapping",
    handleData = "handleData",
    summary = "summary",
}

enum ImportMappedFieldEnum {
    date = 'date',
    money = 'money',
    description = 'description',
    currency = 'currency',
    type = 'typeId',
}

export {ImportActionEnum, ImportStepNameEnum, ImportMappedFieldEnum}