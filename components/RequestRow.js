import React from 'react'
import {Table,Button} from "semantic-ui-react"
function RequestRow(props) {
    console.log(props.data.value)
  return (
      <Table.Row>
          <Table.Cell>{props.index}</Table.Cell>
          <Table.Cell>{props.data.description}</Table.Cell>
          <Table.Cell>{props.data.value}</Table.Cell>
          <Table.Cell>{props.data.recipient}</Table.Cell>
          <Table.Cell>{props.data.approvalCount}</Table.Cell>
          <Table.Cell><Button primary>Approve</Button></Table.Cell>
          <Table.Cell><Button primary>Finalize</Button></Table.Cell>
      </Table.Row>
  )
}

export default RequestRow