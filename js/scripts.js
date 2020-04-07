// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

Contact.prototype.addAddress = function (address) {
  this.addresses.push(address);
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function (id) {
  for (var i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress) {
    this.firstName = firstName,
    this.lastName = lastName,
    this.phoneNumber = phoneNumber,
    this.emailAddress = emailAddress
    this.addresses = [];
  };
function Address(type, street, city, state, zip) {
    this.type = type,
    this.street = street,
    this.city = city,
    this.state = state,
    this.zip = zip
}
Address.prototype.addAddress = function (address){
this.addresses.push(address);
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

// Address.prototype.fullAddress = function(){
//   return this.type + " " + this.street + " " + this.city + " " + this.state + " " + this.zip;
// }

// User Interface Logic ---------
var addressBook = new AddressBook();
// var physicalAddress = new Address();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  // var address = 
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  //something like this:
  $(".full-address").html(contact.addresses[0].type + " " + contact.addresses[0].street + " " + contact.addresses[0].city + " " + contact.addresses[0].state + " " + contact.addresses[0].zip);
  // $(".full-address").html(contact.addresses[0].street);
  // $(".full-address").html(contact.addresses[2].city);
  // $(".full-address").html(contact.addresses[3].state);
  // $(".full-address").html(contact.addresses[4].zip);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedType = $("select#type").val();
    var inputtedStreet = $("input#address-street").val();
    var inputtedCity = $("input#address-city").val();
    var inputtedState = $("input#address-state").val();
    var inputtedZip = $("input#address-zip").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-address").val("");
    var newAddress = new Address(inputtedType, inputtedStreet, inputtedCity, inputtedState,inputtedZip);
    console.log(newAddress);
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress);
    newContact.addAddress(newAddress);
    addressBook.addContact(newContact)
    console.log(addressBook)
    displayContactDetails(addressBook);
    
  })
})