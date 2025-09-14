/**
 * @description defines the store for monthly payments upload wizard module
 */
import {defineStore} from 'pinia'

import {BackendModuleCaller} from "@/scripts/Core/Services/Request/BackendModuleCaller";

import SymfonyPaymentsRoutes from "@/router/SymfonyRoutes/Modules/SymfonyPaymentsRoutes";

import {ImportMappedFieldEnum} from "@/scripts/Core/Enum/PaymentMonthly";

import {required} from "@vuelidate/validators";
import {ValidationRule} from "@vuelidate/core";


const UploadWizardStore = defineStore('paymentMonthlyUploadWizardStore', {
    state: () => ({
        isFirstStep: true,
        isLastStep: false,
        /**
         * @description current wizard step name
         */
        currentStep: null,
        /**
         * @description the upload file worksheet (it's always the first one, more is not supported)
         */
        worksheet: null,
        /**
         * @description the headers that were found in the uploaded file
         */
        fileHeaders: [],
        /**
         * @description these columns will be map-able to upload file headers
         */
        fieldToColumnMapping: {
            [ImportMappedFieldEnum.date]: null,
            [ImportMappedFieldEnum.money]: null,
            [ImportMappedFieldEnum.description]: null,
            [ImportMappedFieldEnum.currency]: null,
        },
        /**
         * @description validations of fields mapped-to-column
         */
        mappingFieldsValidations: {
            date: [
                required,
            ],
            money: [
                required,
            ],
            description: [
                required,
            ],
        },
        /**
         * @description fields mapped-to-column that are required in the wizard
         */
        requiredMappingFields: [
            ImportMappedFieldEnum.date,
            ImportMappedFieldEnum.money,
            ImportMappedFieldEnum.description,
        ],
        /**
         * @description removed mapped values - this can be used to restore them
         */
        deletedMappedValues: [],
        /**
         * @description removed the spreadsheet original rows values - this can be used to restore them
         */
        deletedSpreadsheetRowsOriginalData: [],
        /**
         * @description the original - never to be changed values, mapped from import file
         */
        rowsMappedValues: [],
        /**
         * @description the modified/processed values, mapped from import file. TLDR; edited {@see UploadWizardStore.rowsMappedValues}
         */
        rowsCurrentValues: [],
        /**
         * @description all the spreadsheet original rows values (not only the mapped ones)
         */
        spreadsheetRowsOriginalData: [],
    }),
    actions: {
        /**
         * @description fetches all the products data
         */
        async getAll(): Promise<void> {
            this.allEntries = await new BackendModuleCaller().getAll(SymfonyPaymentsRoutes.MONTHLY_BASE_URL);
        },
        setLastStepState(isLastStep: boolean): void {
            this.isLastStep = isLastStep;
        },
        setCurrentStep(stepName: string | null): void {
            this.currentStep = stepName;
        },
        setFirstStepState(isFirstStep: boolean): void {
            this.isFirstStep = isFirstStep;
        }
    }
});

type RowValue = Record<string, number | string | boolean | null>;
type UploadWizardStoreType = {
    isFirstStep: boolean,
    isLastStep: boolean,
    currentStep: null|string,
    worksheet: null,
    fileHeaders: Array<string>,
    fieldToColumnMapping: Record<string, string | null>,
    requiredMappingFields: Array<string>,
    mappingFieldsValidations: Array<ValidationRule>,
    rowsMappedValues: Array<RowValue>,
    deletedMappedValues: Array<RowValue>,
    deletedSpreadsheetRowsOriginalData: Array<RowValue>,
    rowsCurrentValues: Array<RowValue>,
    spreadsheetRowsOriginalData: Array<RowValue>,
}

export {UploadWizardStore, UploadWizardStoreType};