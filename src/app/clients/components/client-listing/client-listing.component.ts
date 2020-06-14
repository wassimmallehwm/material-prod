import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ClientDialogComponent } from '../client-dialog/client-dialog.component';
import { remove } from 'lodash';

@Component({
  selector: 'app-client-listing',
  templateUrl: './client-listing.component.html',
  styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {

  clients: Client[];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'action'];
  loader = true;

  constructor(private clientService: ClientsService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients() {
    this.loader = true;
    this.clientService.getClients().subscribe(
      data => {
        this.clients = data;
        this.loader = false;
      },
      error => {
        this.errorHandler(error, 'Clients fetch Failed !');
      }
    );
  }

  openDialog(id: string) {
    const options = {
      width: '450px',
      height: '350px',
      data: null
    };
    if(id) {
      options.data = id;
    }
    const dialogRef = this.dialog.open(ClientDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if(result && !id) {
        this.create(result);
      } else if(result && id){
        this.edit(id, result);
      }
    });
  }

  delete(id: string) {
    this.loader = true;
    this.clientService.delete(id).subscribe(
      data => {
        this.snackBar.open('Invoice deleted', 'Success', {
          duration: 3000
        });
        const removedItem = remove(this.clients, (item) => {
          return item._id === data._id;
        });
        this.clients = [...this.clients];
        this.loader = false;
      },
      error => {
        this.errorHandler(error, 'Failed to delete Invoice !');
      }
    );
  }

  private create(client) {
    this.clientService.create(client).subscribe(
      data => {
        this.snackBar.open('Client created !', 'Success', {
          duration: 3000
        });
        this.clients.push(data);
        this.clients = [...this.clients];
      },
      error => {
        this.errorHandler(error, 'Client creation Failed !');
      }
    );
  }

  private edit(id, client) {
    this.clientService.edit(id, client).subscribe(
      data => {
        this.snackBar.open('Client updated !', 'Success', {
          duration: 3000
        });
        const index = this.clients.findIndex(client => client._id === id);
        this.clients[index] = data;
        this.clients = [...this.clients];
      },
      error => {
        this.errorHandler(error, 'Client edition Failed !');
      }
    );
  }

  private errorHandler(error, message){
    console.log(error);
    this.loader = false;
    this.snackBar.open(message, 'Error', {
      duration: 3000
    });
  }

}
