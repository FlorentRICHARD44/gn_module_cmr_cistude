import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class StudyAreaService {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.initForm();
    }

    initForm(): void {
        this.form = this.fb.group({
            id_area: null,
            area_name: [null, Validators.required],
            city_name: [null, Validators.required],
            postal_code: [null, [Validators.required, Validators.pattern('^[0-9]{5}$')]],
            polygon_name: null,
            description: null
        });
    }
}