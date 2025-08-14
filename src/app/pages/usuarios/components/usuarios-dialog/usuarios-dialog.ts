import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../../../../material.module';
import { CommonModule } from '@angular/common';
import { BaseForm } from '../../../../shared/utils/base-form';
import { UsuariosService } from '../../services/usuarios';
import { UsuarioResponse } from '../../../../shared/models/usuario.interface';

enum Action {
  EDIT = 'edit',
  NEW = 'new'
}

@Component({
  selector: 'app-usuarios-dialog',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios-dialog.html',
  styleUrl: './usuarios-dialog.scss'
})
export class UsuariosDialog implements OnInit {
  actionTODO = Action.NEW;
  titleButton = "Guardar";
  usuarioForm!: FormGroup;
  hidePassword = true; // Add password visibility toggle

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UsuariosDialog>,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private usuarioSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      id_usuario: [''],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      numero_control: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
    });
    this.pathData();
  }

  onSave() {
    if (this.usuarioForm.invalid) return;
    const formValues = this.usuarioForm.getRawValue();
    
    if (this.actionTODO == Action.NEW) {
      var newUsuario: UsuarioResponse = {
        nombre: formValues.nombre ? formValues.nombre : '',
        apellido: formValues.apellido ? formValues.apellido : '',
        numero_control: formValues.numero_control ? formValues.numero_control : '',
        usuario: formValues.usuario ? formValues.usuario : '',
        email: formValues.email ? formValues.email : '',
        contrasena: formValues.contrasena ? formValues.contrasena : ''
      };
      this.usuarioSvc.newUsuario(newUsuario).subscribe((result: any) => {
        this.dialogRef.close(result);
      });
    } else {
      var updateUsuario: UsuarioResponse = {
        id_usuario: formValues.id_usuario ? parseInt(formValues.id_usuario) : 0,
        nombre: formValues.nombre ? formValues.nombre : '',
        apellido: formValues.apellido ? formValues.apellido : '',
        numero_control: formValues.numero_control ? formValues.numero_control : '',
        usuario: formValues.usuario ? formValues.usuario : '',
        email: formValues.email ? formValues.email : '',
        contrasena: formValues.contrasena ? formValues.contrasena : ''
      };
      this.usuarioSvc.updateUsuario(updateUsuario).subscribe((result: any) => {
        this.dialogRef.close(result);
      });
    }
  }

  pathData() {
    if (this.data.usuario.id_usuario) {
      this.actionTODO = Action.EDIT;
      this.titleButton = "Editar";
      this.usuarioForm.patchValue({
        id_usuario: this.data.usuario?.id_usuario,
        nombre: this.data.usuario?.nombre,
        apellido: this.data.usuario?.apellido,
        numero_control: this.data.usuario?.numero_control,
        usuario: this.data.usuario?.usuario,
        email: this.data.usuario?.email,
        contrasena: this.data.usuario?.contrasena
      });
      this.usuarioForm.updateValueAndValidity();
    }
  }

  onClear() {
    this.usuarioForm.reset();
  }

  // Toggle password visibility
  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
