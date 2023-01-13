import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetUser(this.getId).subscribe((res: { [x: string]: any; }) => {
      this.updateForm.setValue({
        firstName: res['firstName'],
        lastName: res['lastName'],
        emailId: res['emailId'],
      });
    });

    this.updateForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailId: [''],
    });
  }

  ngOnInit() {}

  onUpdate(): any {
    this.crudService.updateUser(this.getId, this.updateForm.value).subscribe(
      () => {
        console.log('Data updated successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'));
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
