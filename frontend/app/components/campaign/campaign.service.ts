import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class CampaignService {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            id_campaign: null,
            description: [null, Validators.required],
            operators: null,
            name: null
        });
    }
}