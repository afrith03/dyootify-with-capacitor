var CiscoOVPShipment = Class.create();
CiscoOVPShipment.prototype = {
  initialize: function () {
    var message = "";
    this.hasContent = false;
    this.logging = true;
  },
  getNewAsset: function (ast) {
    var shipmentID;
    var orderID;
    var requestedItem;
    var count = 0;
    var AssetInfoList = [];
    var tsk = "";
    var asset_num = "";
    gs.log("AR> shipmet length1:" + ast.length);
    for (i = 0; i < ast.length; i++) {
      count++;
      gs.log("AR> shipmet Asset ID2:" + ast[i]);
      asset_num = ast[i];
      gs.log("AR> shipmet Asset num2:" + asset_num);
      // gs.sleep(30000);
      var asst1 = new GlideRecord("alm_asset");
      asst1.addQuery("sys_id", asset_num);
      asst1.query();
      gs.log("RowCount2" + asst1.getRowCount());
      if (asst1.next()) {
        tsk = new GlideRecord("sc_task");
        tsk.get(asst1.u_task_number);
        gs.log("AR> shipmet Asset Task1:" + tsk.number);

        var task = new GlideRecord("u_requestitem_m2m");
        task.addQuery("u_order_drop_task", tsk.sys_id);
        // task.addQuery('u_model', asst1.model);
        task.query();
        gs.log("PS> request review task count : " + task.getRowCount());
        while (task.next()) {
          if (task.u_type == "Bundle") {
            gs.log("PS> request review task inside");
            gs.log("PS> price to RR : " + task.u_price_to_rr);
            pricetoRR = true;
            var jsonStringprice = task.u_price_to_rr;
            gs.log("PS> price to RR1 : " + jsonStringprice);
            var parser = new JSONParser();
            parsedResponse = parser.parse(jsonStringprice);
            gs.log("PS> after parsedResponse" + parsedResponse.model[0].price);

            requestedItem = task.u_ritm.u_external_ritm_number;
            gs.log("PS> shipment requestedItem : " + requestedItem);
          }
        }
        var price = parsedResponse.model[0].price;
        var curr = task.u_model.u_cost_currency;

        shipmentID = tsk.request.u_external_sys_id.toString();
        orderID = tsk.request.u_external_request_number;
        gs.log("AR> shipmet ID1:" + shipmentID);      //---------------------------------------------------------------------
        var mainhr = "";
        var act;
        if (asst1.account.u_type == "Child Entity") {
          act = asst1.account.parent;
        } else {
          act = asst1.model.company;
        }
        var item = new GlideRecord("cmdb_model");
        item.addQuery("company", act);
        item.addQuery("u_higheritemnumber", asst1.model.u_primarylinenumber);
        item.addQuery("u_contractnumber", asst1.model.u_contractnumber);
        item.addQuery("u_mainserializeditem", "Y");
        item.query();
        gs.log("item count : " + item.getRowCount());
        if (item.next()) {
          mainhr = item.u_originalpartnumber;
        }
        if (mainhr == "") {
          mainhr = asst1.model.u_originalpartnumber;
        }
        var ship_date = "";
        if (asst1.u_source == "Excel upload") {
          ship_date = asst1.u_shipment_date;
        } else {
          ship_date = asst1.u_shipment_date;
        }
        if (
          tsk.parent.variables.request_type == "Bulk Order" &&
          tsk.u_is_bulk_order == true
        ) {
          var email_text = tsk.u_email;
          var str = email_text.toString().indexOf("@");
          var email_text1 = email_text.toString().substring(str, email_text);
          gs.log("AR> Bulk Ship to account1 : " + tsk.u_address_1);
          // getting main hardware

          var AssetInfoObj = {
            Name:
              tsk.u_first_name +
              " " +
              tsk.u_last_name +
              " " +
              "(" +
              email_text1 +
              ")",
            PostalAddress: {
              DeliverTo:
                tsk.u_first_name +
                " " +
                tsk.u_last_name +
                " " +
                "(" +
                email_text1 +
                ")",
              Street:
                tsk.u_address_1.toString() + " " + tsk.u_address_2.toString(),
              City: tsk.u_city.toString(),
              State: tsk.u_state1.toString(),
              PostalCode: tsk.u_postal_code.toString(),
              CountryCode: tsk.u_country_code.toString(),
              Role: "shipTo",
            },

            SerialNumber: asst1.serial_number.toString(),
            TagNumber: "",
            ModelNumber: "" + mainhr,
            CarrierIdentifier: asst1.u_carrier_name.toString(),
            ShipmentIdentifier: asst1.u_tracking_number.toString(),
            NoticeDate: gs.nowDateTime(),
            ShipmentDate: "" + ship_date,
            AssetCost: "" + price,
            AssetCostCurrency: "" + curr,
            TrackingLink: "" + asst1.u_carrier_tracking_url.toString(),
          };
        } else {
          var email_text2 = tsk.parent.variables.email;
          var str1 = email_text2.toString().indexOf("@");
          var email_text3 = email_text2.toString().substring(str1, email_text2);
          var AssetInfoObj = {
            Name:
              tsk.parent.variables.first_name +
              " " +
              tsk.parent.variables.last_name +
              " " +
              "(" +
              email_text3 +
              ")",
            PostalAddress: {
              DeliverTo:
                tsk.parent.variables.first_name +
                " " +
                tsk.parent.variables.last_name +
                " " +
                "(" +
                email_text3 +
                ")",
              Street:
                tsk.parent.variables.address_1.toString() +
                " " +
                tsk.parent.variables.address_2.toString(),
              City: tsk.parent.variables.city.toString(),
              State: tsk.parent.variables.state.toString(),
              PostalCode: tsk.parent.variables.postal_code.toString(),
              CountryCode: tsk.parent.variables.country_code.toString(),
              Role: "shipTo",
            },
            SerialNumber: asst1.serial_number.toString(),
            TagNumber: "",
            ModelNumber: "" + mainhr,
            CarrierIdentifier: asst1.u_carrier_name.toString(),
            ShipmentIdentifier: asst1.u_tracking_number.toString(),
            NoticeDate: gs.nowDateTime(),
            ShipmentDate: "" + ship_date,
            AssetCost: "" + price,
            AssetCostCurrency: "" + curr,
            TrackingLink: "" + asst1.u_carrier_tracking_url.toString(),
          };
        }
        AssetInfoList.push(AssetInfoObj);
      }
    }

    var singleAssetObj = {
      ShipNoticeRequest: {
        ShipNoticeHeader: {
          ShipmentID: "" + shipmentID,
        },
        ShipNoticePortion: {
          OrderID: "" + orderID,
          ShipNoticeItem: [
            {
              AssetInfo: AssetInfoList,
              RequestedItem: "" + requestedItem,
              LineNumber: "1",
              Quantity: "" + count,
            },
          ],
        },
      },
    };

    var jsonPayload = JSON.stringify(singleAssetObj);
    gs.log("AR> shipment API request body1 :" + jsonPayload);

    this.ciscoShipmentApi(
      asset_num,
      "CiscoShipmentAPI",
      "CiscoShipmentAssets",
      jsonPayload,
      1,
      tsk.sys_id
    );
  },

  ciscoShipmentApi: function (recordId, rName, method, payload, count1, task1) {
    //  try {
    gs.log("AR> shipment API request body11 :" + payload);
    var shipmentApi = new sn_ws.RESTMessageV2(rName, method);
    shipmentApi.setRequestHeader("Content-Type", "application/json");
    shipmentApi.setRequestHeader("Accept", "application/json");
    gs.log("AR> shipment API request body12 :" + payload);
    shipmentApi.setRequestBody(payload);
    var response = shipmentApi.execute();
    var jsonString = response.getBody();
    var httpStatus = response.getStatusCode();
    gs.log(
      "AR> shipment API" +
        shipmentApi.getRequestBody() +
        " response : " +
        jsonString +
        " status : " +
        httpStatus
    );
    var body = JSON.parse(jsonString);

    var tlog = new GlideRecord("u_transactions_log");
    tlog.initialize();
    tlog.u_end_point = shipmentApi.getEndpoint();
    tlog.u_payload = shipmentApi.getRequestBody();
    tlog.u_short_description = "CiscoShipmentAPI";
    tlog.u_http_method = "Post";
    tlog.u_task = task1;
    tlog.u_method_type = "outbound";
    tlog.u_status_code = httpStatus;
    tlog.u_retry_attempt = count1;
    tlog.u_response_body = jsonString;
    tlog.insert();

    if (httpStatus == "200" || httpStatus == "201") {
      var asst2 = new GlideRecord("alm_asset");
      asst2.addQuery("sys_id", recordId);
      asst2.query();
      if (asst2.next()) {
        gs.log("AR> Shipment completed" + asst2.serial_number);
        asst2.u_shipment_api = "executed";
        asst2.update();
        gs.log("AR> isShipment flag12" + asst2.u_shipment_api);
      }
      var asst3 = new GlideRecord("u_m2m_assets_catalog_tasks");
      asst3.addQuery("u_asset", recordId);
      asst3.query();
      if (asst3.next()) {
        gs.log("AR> Shipment completed1" + asst3.u_serialnumber);
        asst3.u_shipment_api = "executed";
        asst3.update();
        gs.log("AR> isShipment flag123" + asst3.u_shipment_api);
      }
    } else if ((httpStatus < 200 || httpStatus > 299) && count1 < 5) {
      gs.log("AR> shipment API request body13 :");
      var sc = new GlideRecord("sys_trigger");
      sc.initialize();
      sc.name = rName + "_" + method + "_";
      gs.log("AR> shipment API request body14 :");
      sc.script =
        "var payload = " +
        JSON.stringify(payload) +
        ";\n new CiscoOVPShipment().ciscoShipmentApi('" +
        recordId +
        "','" +
        rName +
        "','" +
        method +
        "',payload," +
        (count1 + 1) +
        ",'" +
        task1 +
        "')";
      gs.log("AR> shipment API request body15 :");
      var dateTime = new GlideDateTime();
      dateTime.addSeconds(gs.getProperty("API Interval"));
      sc.next_action = dateTime.getDisplayValue();
      gs.log("AR> shipment API request body16 :");
      sc.trigger_type = 0;
      sc.insert();

      return false;
    } else {
      return jsonString;
    }
    //         } catch (ex) {
    //             var message = ex.message;
    //             return message;
    //         }
  },

  type: "CiscoOVPShipment",
};
