import { Injectable } from '@angular/core';
import { AssignmentGroupModel } from '../models/job-placement.model';

@Injectable()
export class JobPlacementService {

    private assignmentGroup: AssignmentGroupModel;

    public getAssignmentGroup(): AssignmentGroupModel {
        return this.assignmentGroup;
    }

    public setAssignmentGroup(assignmentGroup: AssignmentGroupModel) {
        this.assignmentGroup = assignmentGroup;
    }

}
