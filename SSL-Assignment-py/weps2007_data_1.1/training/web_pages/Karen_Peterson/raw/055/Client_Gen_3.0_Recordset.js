function Recordset(Name, DSN, UID, PWD, SQL, UniqueKeyCols, Updateable)
{
	RSReconnect(this);
	this.Name = Name;
	this.DSN = DSN;
	this.UID = UID;
	this.PWD = PWD;
	this.SQL = SQL;
	this.UniqueKeyCols = UniqueKeyCols;
	this.Updateable = Updateable;
	this.Separator = "!*+";
	return this;
}

function RSReconnect(Object)
{
	Object.SetColumnValue = RSSetColumnValue;
	Object.MoveFirst = RSMoveFirst;
	Object.MoveNext = RSMoveNext;
	Object.MovePrevious = RSMovePrevious;
	Object.MoveLast = RSMoveLast;
	Object.Insert = RSInsert;
	Object.Update = RSUpdate;
	Object.Delete = RSDelete;
	Object.Close = RSClose;
	Object.Filter = RSFilter;
	Object.OrderBy = RSOrderBy;
	Object.ParseBindings = RSParseBindings;
	Object.SetBindings = RSSetBindings;
	Object.AddBinding = RSAddBinding;
	Object.RemoveBinding = RSRemoveBinding;
	Object.GetBindingValue = RSGetBindingValue;
	Object.SetBindingValue = RSSetBindingValue;
	Object.GetBindingType = RSGetBindingType;
	Object.SetBindingType = RSSetBindingType;
	Object.GetBoundColumnName = RSGetBoundColumnName;
}

function RSSetColumnValue(ColName, Val)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColName);
	if(BindingObj == null)
	{
		BindingObj = new Object;
		BindingObj["Name"] = ColName;
		BindingsArray[BindingsArray.length] = BindingObj;
	}
	BindingObj["Type"] = "VAL";
	BindingObj["Value"] = Val;
	this.SetBindings(BindingsArray);
}

function RSMoveFirst()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='First';");
}

function RSMoveNext()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Next';");
}

function RSMovePrevious()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Previous';");
}

function RSMoveLast()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Last';");
}

function RSInsert()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Insert';");
}

function RSUpdate()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Update';");
}

function RSDelete()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Delete';");
}

function RSClose()
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Close';");
}

function RSFilter(Where)
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='Filter(" + Where + ")';");
}

function RSOrderBy(ColName)
{
	eval("document.forms[0].elements." + this.Name + "_Action.value='OrderBy(" + ColName + ")';");
}

function RSParseBindings()
{
	BindingsArray = new Array();
	Bindings = eval("document.forms[0].elements." + this.Name + "_Bindings.value;");
	if(Bindings != null)
	{
		Bindings = String(Bindings);
		if(Bindings != "")
		{
			nBinding = 0;
			for(;;)
			{
				BindIndex = Bindings.indexOf(this.Separator);
				if(BindIndex >= 0)
				{
					BoundColumn = Bindings.substring(0, BindIndex);
					Bindings = Bindings.substring(BindIndex + this.Separator.length, Bindings.length);
					BindIndex = Bindings.indexOf(this.Separator);
					if(BindIndex >= 0)
					{
						// get the location of the value
						BindingType = Bindings.substring(0, BindIndex);
						Bindings = Bindings.substring(BindIndex + this.Separator.length, Bindings.length);

						// get the value
						BindIndex = Bindings.indexOf(this.Separator);
						if(BindIndex < 0)
						{
							BindIndex = Bindings.length;
						}
						BoundValue = Bindings.substring(0, BindIndex);

						Binding = new Object();
						Binding["Name"] = BoundColumn;
						Binding["Type"] = BindingType;
						Binding["Value"] = BoundValue;
						BindingsArray[nBinding] = Binding;
						nBinding++;

						// next binding
						if(BindIndex == Bindings.length)
						{
							BindIndex = -1;
						}
						else
						{
							Bindings = Bindings.substring(BindIndex + this.Separator.length, Bindings.length);
						}
					}
				}
				if(BindIndex < 0)
				{
					break;
				}
			}
		}
	}
	return BindingsArray;
}

function RSSetBindings(BindingsArray)
{
	Bindings = "";
	if(BindingsArray != null)
	{
		for(i = 0, n = BindingsArray.length; i < n; i++)
		{
			BindingObj = BindingsArray[i];
			if(BindingObj != null)
			{
				ColumnName = BindingObj["Name"];
				BindingType = BindingObj["Type"];
				BoundValue = BindingObj["Value"];
				if(Bindings != "")
				{
					Bindings += this.Separator;
				}
				Bindings += ColumnName + this.Separator + BindingType + this.Separator + BoundValue;
			}
		}
	}
	eval("document.forms[0].elements." + this.Name + "_Bindings.value='" + Bindings + "';");
}

function RSFindBinding(BindingsArray, ColumnName)
{
	if(BindingsArray != null)
	{
		for(i = 0, n = BindingsArray.length; i < n; i++)
		{
			BindingObj = BindingsArray[i];
			if(BindingObj["Name"] == ColumnName)
			{
				return BindingObj;
			}
		}
	}
	return null;
}

function RSAddBinding(ColumnName, BoundValue, BindingType)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColumnName);
	if(BindingObj == null)
	{
		BindingObj = new Object();
		BindingObj["Name"] = ColumnName;
		BindingsArray[BindingsArray.length] = BindingObj;
	}
	BindingObj["Type"] = BindingType;
	BindingObj["Value"] = BoundValue;
	this.SetBindings(BindingsArray);
}

function RSRemoveBinding(ColumnName)
{
	BindingsArray = this.ParseBindings();
	if(BindingsArray.length)
	{
		NewBindingsArray = new Array();
		for(i = 0, n = BindingsArray.length; i < n; i++)
		{
			BindingObj = BindingsArray[i];
			if(BindingObj["Name"] != ColumnName)
			{
				NewBindingsArray[NewBindingsArray.length] = BindingObj;
			}
		}
		this.SetBindings(NewBindingsArray);
	}
}

function RSGetBindingValue(ColumnName)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColumnName);
	if(BindingObj == null)
	{
		return "";
	}
	return BindingObj["Value"];
}

function RSSetBindingValue(ColumnName, BoundValue)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColumnName);
	if(BindingObj != null)
	{
		BindingObj["Value"] = BoundValue;
		this.SetBindings(BindingsArray);
	}
}

function RSGetBindingType(ColumnName)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColumnName);
	if(BindingObj == null)
	{
		return "";
	}
	return BindingObj["Type"];
}

function RSSetBindingType(ColumnName, BindingType)
{
	BindingsArray = this.ParseBindings();
	BindingObj = RSFindBinding(BindingsArray, ColumnName);
	if(BindingObj != null)
	{
		BindingObj["Type"] = BindingType;
		this.SetBindings(BindingsArray);
	}
}

function RSGetBoundColumnName(BoundValue, BindingType)
{
	BindingsArray = this.ParseBindings();
	if(BindingsArray.length)
	{
		for(i = 0, n = BindingsArray.length; i < n; i++)
		{
			BindingObj = BindingsArray[i];
			if(BindingObj["Value"] == BoundValue && BindingObj["Type"] == BindingType)
			{
				return BindingObj["Name"];
			}
		}
	}
	return "";
}


