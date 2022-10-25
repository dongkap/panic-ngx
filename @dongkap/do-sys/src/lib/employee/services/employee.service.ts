import { Injectable } from '@angular/core';
import { EmployeeHeaderModel } from '../models/employee.model';

@Injectable()
export class EmployeeService {

    private employeeHeader: EmployeeHeaderModel;

    public getEmployeeHeader(): EmployeeHeaderModel {
        return this.employeeHeader;
    }

    public setEmployeeHeader(employeeHeader: EmployeeHeaderModel) {
        this.employeeHeader = employeeHeader;
    }

}
