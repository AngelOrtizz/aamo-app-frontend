import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './services/usuarios';
import { UsuarioResponse } from '../../shared/models/usuario.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DefaultResponse } from '../../shared/models/default.interface';
import Swal from 'sweetalert2';
import { UsuariosDialog } from './components/usuarios-dialog/usuarios-dialog';

@Component({
  selector: 'app-usuarios',
  imports: [MaterialModule, CommonModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss'
})
export class Usuarios implements OnInit {
  displayedColumns: string[] = ["numero_control", "nombre", "apellido", "usuario", "email", "fecha_registro", "actions"];
  usuarios = new MatTableDataSource<UsuarioResponse>();

  constructor(
    private usuarioSvc: UsuariosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.usuarioSvc.getUsuarios()
      .subscribe((usuarios: UsuarioResponse[]) => {
        this.usuarios.data = usuarios;
      });
  }

  onOpenModal(usuario: any = {}) {
    const dialogRef = this.dialog.open(UsuariosDialog, {
      minWidth: '60%',
      data: {
        title: 'Registro de Usuarios',
        usuario
      }
    });
    
    dialogRef.afterClosed().subscribe((result: DefaultResponse) => {
      if (result) {
        this.snackBar.open(result.mensaje, '', {
          duration: 5 * 200, // Updated duration
          panelClass: ['success-snackbar'],
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.listar();
      }
    });
  }

  onDelete(id_usuario: number) {
    Swal.fire({
      title: '',
      text: '¿Realmente desea eliminar el registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'darkBlue',
      cancelButtonColor: 'darkRed',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioSvc.deleteUsuario(id_usuario).subscribe((res: DefaultResponse) => {
          this.snackBar.open(res.mensaje, '', {
            duration: 5 * 200, // Updated duration
            panelClass: ['error-snackbar'],
            horizontalPosition: 'end',
            verticalPosition: 'top'
          });
          this.listar();
        });
      }
    });
  }
}
