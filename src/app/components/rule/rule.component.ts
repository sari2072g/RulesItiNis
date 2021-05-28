import { ChangeDetectionStrategy, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-rule',
  templateUrl: './rule.component.html',
  styleUrls: ['./rule.component.css']
})
export class RuleComponent implements OnInit {
  ruleForm: FormGroup;
  lawNameList: any[];
  selectedlawName: any;
  sectionList: any[];
  basicUrl = "https://he.wikisource.org/wiki/";
  url: string;
  refToList: any[];
  isDisabled: boolean = true;
  isClickable: boolean = false;
  constructor(private httpService: HttpService, private fb: FormBuilder) {
    this.initializeForm();
    this.initializeInputs()
  }
  initializeInputs() {
    this.httpService.getRule().subscribe(data => {
      this.lawNameList = data;
    })
  }
  initializeForm() {
    this.ruleForm = this.fb.group({
      LawName: ['', Validators.required],
      componentNum: ['', Validators.required],
      refto: ['', Validators.required]
    })

  }
  updateLawName() {
    this.isClickable = false;
    this.sectionList = this.httpService.getsection(this.lawNameList, this.ruleForm.get("LawName").value.LawUri)
  }
  updateSection() {
    this.isClickable = false;
    this.refToList = this.sectionList.find(x => x.componentNum == this.ruleForm.get("componentNum").value.componentNum).refTo;
    if (this.refToList.length == 0)
      this.isDisabled = false;
    else {
      this.isDisabled = true;
    }
  }
  updaterefTo() {
    this.isDisabled = false;
  }
  search() {
    debugger
    this.isClickable = true;

    this.refToList = this.sectionList.find(x => x.componentNum == this.ruleForm.get("componentNum").value.componentNum).refTo;
    if (this.refToList.length == 0)
      this.url = this.basicUrl + this.ruleForm.get("LawName").value.LawName + "#סעיף" + this.ruleForm.get("componentNum").value.componentNum;
    if (this.refToList.length == 1) {
      if (this.refToList[0].refTo_eId.includes("/")) {
        this.url = this.refToList[0].refTo_eId;

      }
      else {
        if (this.refToList[0].refTo_eId.includes("point")) {
          let str = this.refToList[0].refTo_eId;
          this.url = this.basicUrl + this.ruleForm.get("LawName").value.LawName + "#סעיף" + str.split("#point_").pop();
        }
        else {
          this.url = this.refToList[0].refTo_eId;
        }
      }
    }
    else {
      if (this.ruleForm.get("refto").value.refTo_eId) {
        if (this.ruleForm.get("refto").value.refTo_eId.includes("/")) {
          this.url = this.ruleForm.get("refto").value.refTo_eId;

        }
        else {
          if (this.ruleForm.get("refto").value.refTo_eId.includes("point")) {
            let str = this.ruleForm.get("refto").value.refTo_eId;
            this.url = this.basicUrl + this.ruleForm.get("LawName").value.LawName + "#סעיף" + str.split("#point_").pop();
          }
          else {
            this.url = this.ruleForm.get("refto").value.refTo_eId;
          }
        }
      }
    }
  }
  ngOnInit(): void {
  }

}
