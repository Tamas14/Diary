import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  Injectable,
  Input,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ModalConfig} from "./modal.config";
import {Store} from "@ngrx/store";
import {State} from "../../diary/store/story.reducer";
import {Subscription} from "rxjs";
import {DiaryEditComponent} from "../../diary/diary-edit/diary-edit.component";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
@Injectable()
export class ModalComponent implements OnInit {
  @Input() public modalConfig: ModalConfig
  @ViewChild('modal') private modalContent: TemplateRef<ModalComponent>
  @ContentChild(DiaryEditComponent) diaryEdit: DiaryEditComponent;

  private modalRef: NgbModalRef;

  private subscription: Subscription;

  constructor(private modalService: NgbModal, private store: Store<State>) {
  }

  modal: any;

  ngOnInit(): void {
  }

  _window(){
    return window;
  }

  open() {

    this.modalRef = this.modalService.open(this.modalContent, {
      beforeDismiss: () => {
        this.modalRef.close();
        return false;
      }
    });

    // @ts-ignore
    this._window().modal = this.modalRef;

    this.modalRef.result.then()
  }

  dismiss() {
    this.modalRef.close()
  }
}
