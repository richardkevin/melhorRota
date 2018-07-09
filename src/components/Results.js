import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

const columnData = ["DATA/HORA", "LINHA", "ORDEM"];

class SimpleTable extends Component {
  state = { page: 0, perPage: 5 };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ perPage: event.target.value });
  };

  render() {
    const { classes, data } = this.props;
    const { perPage, page } = this.state;

    if (!data.length) {
      return <div style={{ margin: 16 }}>Nenhum resultado foi encontrado</div>;
    }

    const emptyRows = perPage - Math.min(perPage, data.length - page * perPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {columnData.map(colName => {
                  return <TableCell key={colName}>{colName}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * perPage, page * perPage + perPage)
                .map((line, idx) => {
                  return (
                    <TableRow key={`${line[1]}-${idx}`}>
                      <TableCell>{line[0]}</TableCell>
                      <TableCell component="th" scope="row">
                        {line[2]}
                      </TableCell>
                      <TableCell>{line[1]}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={perPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTable);
